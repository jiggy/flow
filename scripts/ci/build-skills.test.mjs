import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { lstat, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { buildSkills } from '../build-skills.mjs'

const repository = new URL('../../', import.meta.url)
const revision = '1234567890abcdef1234567890abcdef12345678'
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
  const root = await mkdtemp(new URL('skill-bundle-test-', temporary).pathname)
  t.after(() => rm(root, { recursive: true, force: true }))
  for (const [path, content] of Object.entries({
    'skills/references.json': JSON.stringify(manifest),
    'skills/flow/SKILL.md':
      '---\nname: flow\ndescription: FLOW authoring.\n---\n\n# FLOW\n\nRead [Create](../../docs/flow/guide/create.md).\n',
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

test('bundles readable references, exact machine bytes, code examples, provenance, and notices', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'built')
  assert.deepEqual(await buildSkills({ root, output, revision }), ['flow'])
  const skill = await readFile(join(output, 'flow/SKILL.md'), 'utf8')
  assert.match(skill, /\[Create\]\(references\/guide\/create\.md\)/)
  const generated = await readFile(join(output, 'flow/references/guide/create.md'), 'utf8')
  assert.ok(generated.startsWith('---\ntitle: Create\n---\n'))
  assert.match(generated, /Generated from docs\/flow\/guide\/create\.md/)
  assert.match(generated, /\[`Package`\]\(\.\.\/spec\/package\.md#metadata\)/)
  assert.match(generated, /\[More\]\(https:\/\/flow\.jig\.md\/guide\/more\.md\)/)
  assert.ok(
    generated.includes(`https://github.com/jiggy/flow/blob/${revision}/packages/example/source.ts`),
  )
  assert.match(generated, /\[Schema\]\(\.\.\/spec\/machine\/package\.json\)/)
  assert.ok(generated.includes('[package]: ../spec/package.md "Package"'))
  assert.ok(generated.includes(codeExample))
  assert.ok(generated.includes('`[Inline example](missing-inline.md)`'))
  assert.ok(generated.includes('``An inline `tick` and [link](missing-inline.md)``'))
  assert.ok(generated.includes('    [Indented example](missing-indented.md)'))
  assert.deepEqual(
    await readFile(join(output, 'flow/references/spec/machine/package.json')),
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
    assert.deepEqual(await readFile(join(output, 'flow', path)), await readFile(join(root, path)))
  const provenance = JSON.parse(await readFile(join(output, 'flow/provenance.json'), 'utf8'))
  assert.equal(provenance.checkoutRevision, revision)
  for (const file of provenance.files) {
    const hash = (bytes) => createHash('sha256').update(bytes).digest('hex')
    assert.equal(file.sourceSha256, hash(await readFile(join(root, file.source))))
    assert.equal(file.outputSha256, hash(await readFile(join(output, 'flow', file.destination))))
  }
  await rm(join(root, 'docs'), { recursive: true })
  assert.ok(
    (await readFile(join(output, 'flow/references/guide/create.md'), 'utf8')).includes('# Create'),
  )
})

test('identical sources generate identical bytes and changed docs update the next bundle', async (t) => {
  const root = await fixture(t)
  const first = join(root, 'first')
  const second = join(root, 'second')
  await buildSkills({ root, output: first, revision })
  await buildSkills({ root, output: second, revision })
  assert.deepEqual(await snapshot(first), await snapshot(second))
  await put(root, 'docs/flow/guide/create.md', guide + '\nNew canonical guidance.\n')
  const third = join(root, 'third')
  await buildSkills({ root, output: third, revision })
  assert.match(
    await readFile(join(third, 'flow/references/guide/create.md'), 'utf8'),
    /New canonical guidance/,
  )
  assert.notDeepEqual(await snapshot(first), await snapshot(third))
})

test('removed references disappear from a fresh bundle instead of surviving as stale files', async (t) => {
  const root = await fixture(t)
  await buildSkills({ root, output: join(root, 'before'), revision })
  const reduced = structuredClone(manifest)
  reduced.skills.flow = reduced.skills.flow.filter((path) => !path.endsWith('machine/package.json'))
  await put(root, 'skills/references.json', JSON.stringify(reduced))
  const output = join(root, 'after')
  await buildSkills({ root, output, revision })
  await assert.rejects(lstat(join(output, 'flow/references/spec/machine/package.json')), {
    code: 'ENOENT',
  })
  assert.match(
    await readFile(join(output, 'flow/references/guide/create.md'), 'utf8'),
    /https:\/\/flow\.jig\.md\/schemas\/package\.json/,
  )
})

test('missing sources and broken prose links fail before exposing a partial bundle', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'built')
  await rm(join(root, 'docs/flow/spec/package.md'))
  await assert.rejects(buildSkills({ root, output, revision }), /Missing source/)
  await assert.rejects(lstat(output), { code: 'ENOENT' })
  await put(root, 'docs/flow/spec/package.md', '# Package\n\n[Missing](unknown.md)\n')
  await assert.rejects(buildSkills({ root, output, revision }), /Missing source/)
  await assert.rejects(lstat(output), { code: 'ENOENT' })
})

test('every source-relative skill pointer must be included in the manifest', async (t) => {
  const root = await fixture(t)
  await put(
    root,
    'skills/flow/SKILL.md',
    '---\nname: flow\ndescription: FLOW authoring.\n---\n\n[More](../../docs/flow/guide/more.md)\n',
  )
  await assert.rejects(
    buildSkills({ root, output: join(root, 'built'), revision }),
    /add required reference to the manifest/,
  )
})

test('parses YAML metadata and rejects malformed or invalid required fields', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'built')
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
    await assert.rejects(buildSkills({ root, output, revision }), /SKILL\.md needs/)
    await assert.rejects(lstat(output), { code: 'ENOENT' })
  }
  await put(
    root,
    'skills/flow/SKILL.md',
    '---\nname: "flow"\ndescription: >-\n  FLOW authoring\n  and review.\ndisable-model-invocation: true\n---\n\n# FLOW\n',
  )
  assert.deepEqual(await buildSkills({ root, output, revision }), ['flow'])
})

test('rejects private, escaping, and symbolic-link inputs', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'built')
  for (const invalid of ['docs/flow/AGENTS.md', 'docs/flow/../private.md', '.agents/secret.md']) {
    await put(
      root,
      'skills/references.json',
      JSON.stringify({ version: 1, skills: { flow: [invalid] } }),
    )
    await assert.rejects(
      buildSkills({ root, output, revision }),
      /Invalid or repeated documentation/,
    )
  }
  await put(root, 'skills/references.json', JSON.stringify(manifest))
  await rm(join(root, 'docs/flow/spec/package.md'))
  await symlink('../guide/create.md', join(root, 'docs/flow/spec/package.md'))
  await assert.rejects(buildSkills({ root, output, revision }), /symbolic link/)
  await assert.rejects(lstat(output), { code: 'ENOENT' })
})

test('an existing output or invalid output parent is never replaced', async (t) => {
  const root = await fixture(t)
  const output = join(root, 'owned')
  await put(root, 'owned/keep.txt', 'retain this file')
  await assert.rejects(buildSkills({ root, output, revision }), /already exists/)
  assert.equal(await readFile(join(output, 'keep.txt'), 'utf8'), 'retain this file')
  await assert.rejects(buildSkills({ root, output: join(output, 'keep.txt/child'), revision }), {
    code: 'ENOTDIR',
  })
  await assert.rejects(
    buildSkills({ root, output: join(root, 'built'), revision: 'main' }),
    /full source checkout revision/,
  )
})
