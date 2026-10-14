import { execFileSync } from 'node:child_process'
import { appendFile, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { verifyCandidate } from './flow-candidates.mjs'
import { downloadArtifact } from './artifact-transfer.mjs'

const expectedJobs = [
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

export function validateReleaseRun(run, jobs, repository, runId, attempt) {
  if (
    run.repository?.full_name !== repository ||
    run.head_repository?.full_name !== repository ||
    run.id !== runId ||
    run.run_attempt !== attempt ||
    run.path !== '.github/workflows/ci.yml' ||
    run.event !== 'push' ||
    run.head_branch !== 'main' ||
    run.status !== 'completed' ||
    run.conclusion !== 'success' ||
    !/^[a-f0-9]{40}$/.test(run.head_sha)
  )
    throw new Error('Release requires the exact successful main-push CI attempt')
  if (
    jobs.length !== expectedJobs.length ||
    new Set(jobs.map((job) => job.name)).size !== jobs.length ||
    jobs.some(
      (job) => job.run_id !== runId || job.run_attempt !== attempt || job.head_sha !== run.head_sha,
    ) ||
    expectedJobs.some(
      (name) =>
        !jobs.some(
          (job) => job.name === name && job.status === 'completed' && job.conclusion === 'success',
        ),
    )
  )
    throw new Error('Missing complete fresh qualification jobs')
  return run.head_sha
}

function api(repository, path, paginate = false) {
  const args = ['api', `repos/${repository}/${path}`]
  if (paginate) args.push('--paginate', '--slurp')
  return JSON.parse(
    execFileSync('gh', args, { encoding: 'utf8', timeout: 60_000, maxBuffer: 16 * 1024 * 1024 }),
  )
}

export async function authorize(
  runId,
  attempt,
  { repository = process.env.GITHUB_REPOSITORY, client = api } = {},
) {
  if (
    !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository || '') ||
    !Number.isSafeInteger(runId) ||
    runId <= 0 ||
    !Number.isSafeInteger(attempt) ||
    attempt <= 0
  )
    throw new Error('Invalid release producer identity')
  const run = client(repository, `actions/runs/${runId}`)
  const jobs = client(
    repository,
    `actions/runs/${runId}/attempts/${attempt}/jobs?per_page=100`,
    true,
  ).flatMap((page) => page.jobs)
  const source = validateReleaseRun(run, jobs, repository, runId, attempt)
  const artifacts = client(
    repository,
    `actions/runs/${runId}/artifacts?per_page=100`,
    true,
  ).flatMap((page) => page.artifacts)
  const name = `flow-candidates-${source}-r${runId}-a${attempt}`
  const selected = artifacts.filter((artifact) => artifact.name === name)
  if (
    selected.length !== 1 ||
    selected[0].expired !== false ||
    !Number.isSafeInteger(selected[0].id) ||
    selected[0].id <= 0 ||
    !Number.isFinite(Date.parse(selected[0].expires_at)) ||
    Date.parse(selected[0].expires_at) <= Date.now() ||
    !/^sha256:[a-f0-9]{64}$/.test(selected[0].digest || '') ||
    selected[0].workflow_run?.id !== runId ||
    selected[0].workflow_run?.head_sha !== source
  )
    throw new Error('Missing immutable current-attempt candidate artifact')
  return { source, artifactId: selected[0].id, artifactDigest: selected[0].digest, runId, attempt }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [command, runText, attemptText, directory] = process.argv.slice(2)
  const authorization = await authorize(Number(runText), Number(attemptText))
  if (command === 'authorize' && !directory) {
    if (!process.env.GITHUB_OUTPUT) throw new Error('GITHUB_OUTPUT is required')
    await appendFile(
      process.env.GITHUB_OUTPUT,
      `source=${authorization.source}\nartifact_id=${authorization.artifactId}\nartifact_digest=${authorization.artifactDigest}\n`,
    )
  } else if (command === 'download' && directory) {
    await downloadArtifact(process.env.GITHUB_REPOSITORY, authorization, resolve(directory))
    await writeFile(
      resolve(directory, 'AUTHORIZATION.json'),
      JSON.stringify(authorization) + '\n',
      { flag: 'wx' },
    )
    await verifyCandidate(directory, authorization.source)
  } else if (command === 'verify' && directory) {
    const snapshot = JSON.parse(await readFile(resolve(directory, 'AUTHORIZATION.json'), 'utf8'))
    for (const key of ['source', 'artifactId', 'artifactDigest', 'runId', 'attempt'])
      if (snapshot[key] !== authorization[key])
        throw new Error('Queued publication authorization changed')
    await verifyCandidate(directory, authorization.source)
  } else
    throw new Error('Use authorize <run> <attempt> or verify <run> <attempt> <candidate-directory>')
}
