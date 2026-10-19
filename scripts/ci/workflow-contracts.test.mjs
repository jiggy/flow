import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { parse } from 'yaml'

const workflows = new URL('../../.github/workflows/', import.meta.url)
const rootKeys = new Set([
  'name',
  'run-name',
  'on',
  'permissions',
  'env',
  'defaults',
  'concurrency',
  'jobs',
])

test('every workflow declares GitHub triggers using YAML 1.2 keys', async () => {
  for (const file of await readdir(workflows)) {
    if (!/\.ya?ml$/.test(file)) continue
    const workflow = parse(await readFile(new URL(file, workflows), 'utf8'))
    assert.ok(workflow && typeof workflow === 'object', file)
    for (const key of Object.keys(workflow))
      assert.ok(rootKeys.has(key), `${file}: unknown workflow key ${key}`)
    assert.ok(workflow.on, `${file}: missing GitHub on trigger`)
    assert.ok(workflow.jobs && Object.keys(workflow.jobs).length, `${file}: missing jobs`)
  }
})

test('publication workflows use the configured protected registry environments', async () => {
  for (const [file, environment] of [
    ['npm-publish.yml', 'npm'],
    ['pypi-publish.yml', 'pypi'],
  ]) {
    if (!(await readdir(workflows)).includes(file)) continue
    const workflow = parse(await readFile(new URL(file, workflows), 'utf8'))
    assert.ok(
      workflow.on.workflow_run.workflows.includes('CI'),
      `${file}: missing CI completion trigger`,
    )
    const jobs = Object.values(workflow.jobs).filter((job) => job.environment)
    assert.ok(jobs.length, `${file}: missing protected publication job`)
    for (const job of jobs)
      assert.equal(
        typeof job.environment === 'string' ? job.environment : job.environment.name,
        environment,
        file,
      )
  }
})

test('npm bootstrap authentication is confined to qualified publication in Actions', async () => {
  const workflow = parse(await readFile(new URL('npm-publish.yml', workflows), 'utf8'))
  const job = workflow.jobs.publish
  assert.equal(job.environment, 'npm')
  assert.equal(workflow.permissions['id-token'], 'write')
  const node = job.steps.find((step) => step.uses?.startsWith('actions/setup-node@'))
  assert.equal(node.with['registry-url'], 'https://registry.npmjs.org')
  assert.equal(node.with['package-manager-cache'], false)
  const authenticated = job.steps.filter((step) =>
    JSON.stringify(step).includes('secrets.NPM_TOKEN'),
  )
  assert.equal(authenticated.length, 1)
  assert.equal(authenticated[0].env.NODE_AUTH_TOKEN, '${{ secrets.NPM_TOKEN }}')
  assert.equal(authenticated[0].run, 'node scripts/ci/publish-npm.mjs candidates')
  assert.ok(
    job.steps.findIndex((step) => step === authenticated[0]) >
      job.steps.findIndex((step) => step.name === 'Revalidate after queueing and download'),
  )
  const ci = parse(await readFile(new URL('ci.yml', workflows), 'utf8'))
  assert.ok(!JSON.stringify(ci).includes('NPM_TOKEN'))
})
