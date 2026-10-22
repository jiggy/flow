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

test('npm publication uses OIDC without a bootstrap token', async () => {
  const workflow = parse(await readFile(new URL('npm-publish.yml', workflows), 'utf8'))
  const job = workflow.jobs.publish
  assert.equal(job.environment, 'npm')
  assert.equal(workflow.permissions['id-token'], 'write')
  const node = job.steps.find((step) => step.uses?.startsWith('actions/setup-node@'))
  assert.equal(node.with['package-manager-cache'], false)
  assert.ok(!JSON.stringify(workflow).includes('NPM_TOKEN'))
  assert.ok(!JSON.stringify(workflow).includes('NODE_AUTH_TOKEN'))
  const publish = job.steps.find(
    (step) => step.run === 'node scripts/ci/publish-npm.mjs candidates',
  )
  assert.ok(publish)
  assert.ok(
    job.steps.findIndex((step) => step === publish) >
      job.steps.findIndex((step) => step.name === 'Revalidate after queueing and download'),
  )
  const ci = parse(await readFile(new URL('ci.yml', workflows), 'utf8'))
  assert.ok(!JSON.stringify(ci).includes('NPM_TOKEN'))
})

test('CI builds and uploads complete skills without source write permissions', async () => {
  const workflow = parse(await readFile(new URL('ci.yml', workflows), 'utf8'))
  const job = workflow.jobs['quick-checks']
  const permissions = job.permissions ?? workflow.permissions
  assert.equal(permissions.contents, 'read')
  const buildIndex = job.steps.findIndex(
    (step) => step.run === 'just build-skills "$RUNNER_TEMP/skills"',
  )
  assert.ok(buildIndex >= 0, 'CI must build skill references from the checked source')
  const uploadIndex = job.steps.findIndex(
    (step) =>
      step.uses?.startsWith('actions/upload-artifact@') &&
      step.with?.path === '${{ runner.temp }}/skills',
  )
  assert.ok(uploadIndex > buildIndex, 'CI must deliver the completed skill folder')
  assert.equal(job.steps[uploadIndex].with['if-no-files-found'], 'error')
  assert.ok(job.steps[uploadIndex].with.name.includes('${{ github.sha }}'))
})
