import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { verifyCandidate } from './flow-candidates.mjs'
import { createHash } from 'node:crypto'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { authorize, validateReleaseRun } from './flow-release.mjs'
import { downloadArtifact } from './artifact-transfer.mjs'
import { comparePrerelease, publishNpm } from './publish-npm.mjs'

const revision = 'a'.repeat(40)
const repository = 'fixture/flow'
const names = [
  'Build candidates',
  'Source and protocol checks',
  'Quick development checks',
  'Build public sites',
  'test',
  ...['ubuntu-24.04', 'macos-14'].flatMap((os) =>
    ['22', '24'].map((node) => `Npm installed (${os}, ${node})`),
  ),
  ...[
    ['ubuntu-24.04', '3.11'],
    ['ubuntu-24.04', '3.12'],
    ['ubuntu-24.04', '3.13'],
    ['ubuntu-24.04', '3.14'],
    ['macos-14', '3.14'],
    ['windows-2022', '3.13'],
  ].map(([os, python]) => `Python ${python} on ${os}`),
]
const run = {
  id: 20,
  run_attempt: 2,
  repository: { full_name: repository },
  head_repository: { full_name: repository },
  path: '.github/workflows/ci.yml',
  event: 'push',
  head_branch: 'main',
  head_sha: revision,
  status: 'completed',
  conclusion: 'success',
}
const jobs = names.map((name) => ({
  name,
  run_id: 20,
  run_attempt: 2,
  head_sha: revision,
  status: 'completed',
  conclusion: 'success',
}))
const authorization = {
  source: revision,
  artifactId: 40,
  artifactDigest: 'sha256:' + 'b'.repeat(64),
  runId: 20,
  attempt: 2,
}
test('all SDK, authoring, interpreter and site profiles must complete on the exact main push attempt', () => {
  assert.equal(validateReleaseRun(run, jobs, repository, 20, 2), revision)
  for (const changed of [
    { ...run, event: 'pull_request' },
    { ...run, head_branch: 'feature' },
    { ...run, head_repository: { full_name: 'fork/flow' } },
    { ...run, run_attempt: 3 },
    { ...run, status: 'in_progress' },
    { ...run, conclusion: 'failure' },
  ])
    assert.throws(() => validateReleaseRun(changed, jobs, repository, 20, 2))
  for (const changed of [
    jobs.slice(1),
    [...jobs, jobs[0]],
    jobs.map((job, i) => (i ? job : { ...job, conclusion: 'skipped' })),
    jobs.map((job, i) => (i ? job : { ...job, run_attempt: 1 })),
  ])
    assert.throws(() => validateReleaseRun(run, changed, repository, 20, 2))
})
test('authorization rejects stale, duplicate and expired artifact identities', async () => {
  const artifact = {
    id: 40,
    name: `flow-candidates-${revision}-r20-a2`,
    expired: false,
    digest: authorization.artifactDigest,
    expires_at: new Date(Date.now() + 60000).toISOString(),
    workflow_run: { id: 20, head_sha: revision },
  }
  const client = (repo, path) =>
    path.includes('/attempts/')
      ? [{ jobs }]
      : path.includes('/artifacts?')
        ? [{ artifacts: [artifact] }]
        : run
  assert.deepEqual(await authorize(20, 2, { repository, client }), authorization)
  for (const changed of [
    { ...artifact, expired: true },
    { ...artifact, name: 'old-attempt' },
    { ...artifact, digest: 'unknown' },
    { ...artifact, expires_at: '2000-01-01T00:00:00Z' },
  ]) {
    const bad = (repo, path) =>
      path.includes('/artifacts?') ? [{ artifacts: [changed] }] : client(repo, path)
    await assert.rejects(() => authorize(20, 2, { repository, client: bad }))
  }
  await assert.rejects(() =>
    authorize(20, 2, {
      repository,
      client: (repo, path) =>
        path.includes('/artifacts?') ? [{ artifacts: [artifact, artifact] }] : client(repo, path),
    }),
  )
})
test('artifact download cannot extract bytes whose transport digest changed', async () => {
  let extracted = false
  await assert.rejects(
    () =>
      downloadArtifact(repository, authorization, 'unused', {
        download: async () => Buffer.from('changed'),
        extract: async () => {
          extracted = true
        },
      }),
    /transport digest/,
  )
  assert.equal(extracted, false)
})

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'flow-npm-publication-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  const files = ['flow.tgz', 'authoring.tgz']
  const entries = []
  for (const [index, path] of files.entries()) {
    const bytes = Buffer.from(`archive-${index}`)
    await writeFile(join(root, path), bytes)
    entries.push({
      name: index ? '@jigging/flow-authoring' : '@jigging/flow',
      version: index ? '0.1.0-alpha.1' : '0.1.0-alpha.14',
      path,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    })
  }
  await writeFile(join(root, 'AUTHORIZATION.json'), JSON.stringify(authorization))
  const calls = [],
    versions = new Map(),
    tags = new Map()
  const execute = (args) => {
    calls.push(args)
    if (args[0] === 'publish') {
      const entry = entries.find((entry) => join(root, entry.path) === args[1])
      const bytes = Buffer.from(`archive-${entries.indexOf(entry)}`)
      versions.set(
        `${entry.name}@${entry.version}`,
        'sha512-' + createHash('sha512').update(bytes).digest('base64'),
      )
      return ''
    }
    return (
      JSON.stringify(args[2] === 'dist.integrity' ? versions.get(args[1]) : tags.get(args[1])) || ''
    )
  }
  const options = {
    run: execute,
    verify: async () => ({ packages: entries }),
    reauthorize: async () => authorization,
  }
  return { root, entries, calls, versions, tags, options }
}
test('all packages reconcile before publication and altered registry versions prevent every mutation', async (t) => {
  const f = await fixture(t)
  f.versions.set('@jigging/flow-authoring@0.1.0-alpha.1', 'different')
  await assert.rejects(() => publishNpm(f.root, f.options), /different bytes/)
  assert.equal(f.calls.filter((call) => call[0] === 'publish').length, 0)
})
test('new exact archives publish with provenance and lifecycle scripts disabled', async (t) => {
  const f = await fixture(t)
  await publishNpm(f.root, f.options)
  const publishes = f.calls.filter((call) => call[0] === 'publish')
  assert.equal(publishes.length, 2)
  for (const call of publishes) {
    assert.ok(call.includes('--provenance'))
    assert.ok(call.includes('--ignore-scripts'))
  }
  const firstMutation = f.calls.findIndex((call) => call[0] === 'publish')
  assert.equal(f.calls.slice(0, firstMutation).filter((call) => call[0] === 'view').length, 4)
})
test('a late older candidate cannot downgrade the alpha channel', async (t) => {
  const f = await fixture(t)
  f.tags.set('@jigging/flow', '0.1.0-alpha.15')
  await publishNpm(f.root, f.options)
  assert.equal(f.calls.filter((call) => call[0] === 'publish').length, 1)
  assert.ok(f.calls.filter((call) => call[0] === 'publish')[0][1].endsWith('authoring.tgz'))
  assert.equal(comparePrerelease('0.1.0-alpha.10', '0.1.0-alpha.9'), 1)
})
test('a changed producer attempt during registry reconciliation prevents mutation', async (t) => {
  const f = await fixture(t)
  await assert.rejects(
    () =>
      publishNpm(f.root, {
        ...f.options,
        reauthorize: async () => ({ ...authorization, attempt: 3 }),
      }),
    /authorization changed/,
  )
  assert.equal(f.calls.filter((call) => call[0] === 'publish').length, 0)
})

test('candidate verification reads archives beneath drive-colon paths as local files', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'flow-drive-path-'))
  try {
    const root = join(temporary, process.platform === 'win32' ? 'source' : 'D:', 'candidates')
    const packages = []
    for (const [directory, name] of [
      ['flow-sdk', '@jigging/flow'],
      ['flow-authoring', '@jigging/flow-authoring'],
    ]) {
      const cwd = join(root, directory)
      await mkdir(join(cwd, 'package'), { recursive: true })
      await writeFile(
        join(cwd, 'package/package.json'),
        JSON.stringify({ name, version: '0.1.0-alpha.1', publishConfig: { access: 'public' } }),
      )
      execFileSync('tar', ['-czf', 'candidate.tgz', 'package'], { cwd })
      const path = `${directory}/candidate.tgz`
      packages.push({
        name,
        version: '0.1.0-alpha.1',
        path,
        sha256: createHash('sha256')
          .update(await readFile(join(root, path)))
          .digest('hex'),
      })
    }
    await mkdir(join(root, 'python'))
    for (const extension of ['-py3-none-any.whl', '.tar.gz']) {
      const path = `python/jiggy_flow-0.1.0a1${extension}`
      const bytes = Buffer.from('distribution integrity fixture')
      await writeFile(join(root, path), bytes)
      packages.push({
        name: 'jiggy-flow',
        version: '0.1.0a1',
        path,
        sha256: createHash('sha256').update(bytes).digest('hex'),
      })
    }
    await mkdir(join(root, 'resolution'))
    const resolution = Buffer.from('resolution integrity fixture')
    await writeFile(join(root, 'resolution/bun.lock'), resolution)
    const receipt = {
      schemaVersion: 1,
      sourceRevision: revision,
      packages,
      resolutionSha256: createHash('sha256').update(resolution).digest('hex'),
      qualification: 'pending',
    }
    await writeFile(join(root, 'CANDIDATE.json'), JSON.stringify(receipt))
    assert.deepEqual(await verifyCandidate(root, revision), receipt)
    await writeFile(join(root, packages[0].path), 'changed archive')
    await assert.rejects(() => verifyCandidate(root, revision), /Candidate archive changed/)
  } finally {
    await rm(temporary, { recursive: true, force: true })
  }
})
