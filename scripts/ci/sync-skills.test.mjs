import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { lstat, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { syncSkills } from '../sync-skills.mjs'

const repository = new URL('../../', import.meta.url)
const manifest = {
  version: 1,
  skills: {
    flow: [
      'docs/flow/guide/create.md',
      'docs/flow/spec/package.md',
      'docs/flow/spec/machine/package.json',
    ],
  },
}
const codeExample =
  '````markdown\n[Example](missing-example.md)\n```flow\ncall child @input\n```\n````\n'
const guide =
  '---\ntitle: Create\n---\n\n# Create\n\n' +
  '[`Package`](../spec/package.md#metadata)\n' +
  '[More](more.md)\n' +
  '[Source](../../../packages/example/source.ts)\n' +
  '[Schema](https://flow.jig.md/schemas/package.json)\n' +
  '[Reference][package]\n\n[package]: ../spec/package.md "Package"\n\n' +
  '`[Inline example](missing-inline.md)`\n\n' +
  '``An inline `tick` and [link](missing-inline.md)``\n\n' +
  '    [Indented example](missing-indented.md)\n\n' +
  codeExample

async function put(root, path, content) {
  await mkdir(dirname(join(root, path)), { recursive: true })
  await writeFile(join(root, path), content)
}

async function fixture(t) {
  const temporary = new URL('.tmp/', repository)
  await mkdir(temporary, { recursive: true })
  const root = await mkdtemp(new URL('skill-sync-test-', temporary).pathname)
  t.after(() => rm(root, { recursive: true, force: true }))
  for (const [path, content] of Object.entries({
    'skills/references.json': JSON.stringify(manifest),
    'skills/flow/SKILL.md':
      '---\nname: flow\ndescription: FLOW authoring.\n---\n\n# FLOW\n\nRead [Create](reference/guide/create.md).\n',
    'docs/flow/guide/create.md': guide,
    'docs/flow/guide/more.md': '# More\n',
    'docs/flow/spec/package.md': '# Package\n\n## Metadata\n\n[Create](../guide/create.md)\n',
    'docs/flow/spec/machine/package.json':
      '{"$id":"https://flow.jig.md/schemas/package.json","type":"object"}\n',
    'packages/example/source.ts': 'export const example = 1\n',
  }))
    await put(root, path, content)
  for (const path of [
    'LICENSES.md',
    'Notices.md',
    'LICENSES/Apache-2.0.txt',
    'LICENSES/CC-BY-4.0.txt',
    'LICENSES/Community-Spec-1.0.md',
    'LICENSES/MPL-2.0.txt',
  ])
    await put(root, path, await readFile(new URL(path, repository)))
  return root
}

async function snapshot(root, prefix = '') {
  const entries = []
  for (const name of (await readdir(join(root, prefix))).sort()) {
    const path = join(prefix, name)
    if ((await lstat(join(root, path))).isDirectory()) entries.push(...(await snapshot(root, path)))
    else entries.push([path, (await readFile(join(root, path))).toString('base64')])
  }
  return entries
}

test('synchronizes standalone references while preserving the skill, machine bytes, examples, and notices', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'skills/flow/reference')
  const skill = await readFile(join(root, 'skills/flow/SKILL.md'))
  assert.ok((await syncSkills({ root })).length > 0)
  assert.deepEqual(await readFile(join(root, 'skills/flow/SKILL.md')), skill)
  const generated = await readFile(join(output, 'guide/create.md'), 'utf8')
  assert.ok(generated.startsWith('---\ntitle: Create\n---\n'))
  assert.match(generated, /Generated from docs\/flow\/guide\/create\.md/)
  assert.match(generated, /\[`Package`\]\(\.\.\/spec\/package\.md#metadata\)/)
  assert.match(generated, /\[More\]\(https:\/\/flow\.jig\.md\/guide\/more\.md\)/)
  assert.ok(
    generated.includes('https://github.com/jiggy/flow/blob/main/packages/example/source.ts'),
  )
  assert.match(generated, /\[Schema\]\(\.\.\/spec\/machine\/package\.json\)/)
  assert.ok(generated.includes('[package]: ../spec/package.md "Package"'))
  assert.ok(generated.includes(codeExample))
  assert.ok(generated.includes('`[Inline example](missing-inline.md)`'))
  assert.ok(generated.includes('``An inline `tick` and [link](missing-inline.md)``'))
  assert.ok(generated.includes('    [Indented example](missing-indented.md)'))
  assert.deepEqual(
    await readFile(join(output, 'spec/machine/package.json')),
    await readFile(join(root, 'docs/flow/spec/machine/package.json')),
  )
  for (const path of [
    'LICENSES.md',
    'Notices.md',
    'LICENSES/Apache-2.0.txt',
    'LICENSES/CC-BY-4.0.txt',
    'LICENSES/Community-Spec-1.0.md',
    'LICENSES/MPL-2.0.txt',
  ])
    assert.deepEqual(await readFile(join(output, path)), await readFile(join(root, path)))
  const provenance = JSON.parse(await readFile(join(output, 'provenance.json'), 'utf8'))
  assert.equal(provenance.checkoutRevision, undefined)
  for (const file of provenance.files) {
    const hash = (bytes) => createHash('sha256').update(bytes).digest('hex')
    assert.equal(file.sourceSha256, hash(await readFile(join(root, file.source))))
    assert.equal(file.outputSha256, hash(await readFile(join(output, file.destination))))
  }
  await rm(join(root, 'docs'), { recursive: true })
  assert.ok((await readFile(join(output, 'guide/create.md'), 'utf8')).includes('# Create'))
})

test('check detects drift without writing and synchronization is idempotent', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'skills/flow/reference')
  await assert.rejects(syncSkills({ root, check: true }), /Skill references are stale/)
  await assert.rejects(lstat(output), { code: 'ENOENT' })
  await syncSkills({ root })
  const original = await snapshot(output)
  assert.deepEqual(await syncSkills({ root, check: true }), [])
  assert.deepEqual(await syncSkills({ root }), [])
  assert.deepEqual(await snapshot(output), original)
  await put(root, 'docs/flow/guide/create.md', guide + '\nNew canonical guidance.\n')
  await assert.rejects(syncSkills({ root, check: true }), /Skill references are stale/)
  assert.deepEqual(await snapshot(output), original)
  assert.ok((await syncSkills({ root })).includes('skills/flow/reference/guide/create.md'))
  assert.match(await readFile(join(output, 'guide/create.md'), 'utf8'), /New canonical guidance/)
  assert.deepEqual(await syncSkills({ root, check: true }), [])
  assert.deepEqual(await syncSkills({ root }), [])
})

test('repairs deleted or edited outputs and removes stale references only inside its generated subtree', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'skills/flow/reference')
  await syncSkills({ root })
  const skill = await readFile(join(root, 'skills/flow/SKILL.md'))
  await put(root, 'skills/flow/manual.txt', 'authored resource')
  await put(root, 'skills/flow/reference/stale/old.md', 'obsolete generated reference')
  await put(root, 'skills/flow/reference/guide/create.md', 'manual drift')
  await rm(join(output, 'spec/package.md'))
  const reduced = structuredClone(manifest)
  reduced.skills.flow = reduced.skills.flow.filter((path) => !path.endsWith('machine/package.json'))
  await put(root, 'skills/references.json', JSON.stringify(reduced))
  await assert.rejects(syncSkills({ root, check: true }), /Skill references are stale/)
  const changed = await syncSkills({ root })
  assert.ok(changed.includes('skills/flow/reference/stale/old.md'))
  await assert.rejects(lstat(join(output, 'stale')), { code: 'ENOENT' })
  await assert.rejects(lstat(join(output, 'spec/machine/package.json')), { code: 'ENOENT' })
  assert.match(await readFile(join(output, 'guide/create.md'), 'utf8'), /# Create/)
  assert.match(await readFile(join(output, 'spec/package.md'), 'utf8'), /# Package/)
  assert.deepEqual(await readFile(join(root, 'skills/flow/SKILL.md')), skill)
  assert.equal(await readFile(join(root, 'skills/flow/manual.txt'), 'utf8'), 'authored resource')
  assert.deepEqual(await syncSkills({ root, check: true }), [])
})

test('validates all sources and prose links before changing existing generated references', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'skills/flow/reference')
  await syncSkills({ root })
  const original = await snapshot(output)
  await put(root, 'docs/flow/guide/create.md', guide + '\nChanged canonical guidance.\n')
  await rm(join(root, 'docs/flow/spec/package.md'))
  await assert.rejects(syncSkills({ root }), /Missing source/)
  assert.deepEqual(await snapshot(output), original)
  await put(root, 'docs/flow/spec/package.md', '# Package\n\n[Missing](unknown.md)\n')
  await assert.rejects(syncSkills({ root }), /Missing source/)
  assert.deepEqual(await snapshot(output), original)
})

test('skill pointers must resolve within the installable skill and cover generated references', async (t) => {
  const root = await fixture(t)
  for (const path of ['../../docs/flow/guide/more.md', 'reference/guide/more.md']) {
    await put(
      root,
      'skills/flow/SKILL.md',
      `---\nname: flow\ndescription: FLOW authoring.\n---\n\n[More](${path})\n`,
    )
    await assert.rejects(
      syncSkills({ root }),
      /link must stay inside the skill|reference is missing from the manifest/,
    )
    await assert.rejects(lstat(join(root, 'skills/flow/reference')), { code: 'ENOENT' })
  }
})

test('parses YAML metadata and rejects malformed or invalid required fields', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'skills/flow/reference')
  for (const invalid of [
    '---\nname: flow\ndescription: Missing closing delimiter\n',
    '---\nname: flow\nname: flow\ndescription: Duplicate key\n---\n',
    '---\nname: flow\ndescription: [unclosed sequence\n---\n',
    '---\nname: 42\ndescription: Invalid name\n---\n',
    '---\nname: flow\ndescription: null\n---\n',
    '---\nname: flow\ndescription: " "\n---\n',
    `---\nname: flow\ndescription: ${'x'.repeat(1025)}\n---\n`,
  ]) {
    await put(root, 'skills/flow/SKILL.md', invalid)
    await assert.rejects(syncSkills({ root }), /SKILL\.md needs/)
    await assert.rejects(lstat(output), { code: 'ENOENT' })
  }
  await put(
    root,
    'skills/flow/SKILL.md',
    '---\nname: "flow"\ndescription: >-\n  FLOW authoring\n  and review.\ndisable-model-invocation: true\n---\n\n# FLOW\n',
  )
  assert.ok((await syncSkills({ root })).length > 0)
})

test('rejects private, escaping, and symbolic-link inputs before writing', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'skills/flow/reference')
  for (const invalid of ['docs/flow/AGENTS.md', 'docs/flow/../private.md', '.agents/secret.md']) {
    await put(
      root,
      'skills/references.json',
      JSON.stringify({ version: 1, skills: { flow: [invalid] } }),
    )
    await assert.rejects(syncSkills({ root }), /Invalid or repeated documentation/)
  }
  await put(root, 'skills/references.json', JSON.stringify(manifest))
  await rm(join(root, 'docs/flow/spec/package.md'))
  await symlink('../guide/create.md', join(root, 'docs/flow/spec/package.md'))
  await assert.rejects(syncSkills({ root }), /symbolic link/)
  await assert.rejects(lstat(output), { code: 'ENOENT' })
})

test('refuses generated output symlinks without touching their targets', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'skills/flow/reference')
  await put(root, 'unrelated/keep.txt', 'retain this file')
  await symlink('../../unrelated', output)
  await assert.rejects(syncSkills({ root }), /real directory/)
  assert.equal(await readFile(join(root, 'unrelated/keep.txt'), 'utf8'), 'retain this file')
  await rm(output)
  await syncSkills({ root })
  await symlink('../../../unrelated', join(output, 'outside'))
  await assert.rejects(syncSkills({ root }), /symbolic link/)
  assert.equal(await readFile(join(root, 'unrelated/keep.txt'), 'utf8'), 'retain this file')
})
