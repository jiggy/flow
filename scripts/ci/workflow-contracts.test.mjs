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

test('CI checks committed skill references without source write permissions', async () => {
  const workflow = parse(await readFile(new URL('ci.yml', workflows), 'utf8'))
  const job = workflow.jobs['quick-checks']
  const permissions = job.permissions ?? workflow.permissions
  assert.equal(permissions.contents, 'read')
  assert.ok(job.steps.some((step) => step.run === 'just check-skills'))
  assert.ok(
    !job.steps.some(
      (step) =>
        step.uses?.startsWith('actions/upload-artifact@') &&
        step.with?.name.startsWith('flow-skills-'),
    ),
  )
})

test('skill synchronization updates only same-repository PR heads and dispatches fresh CI', async () => {
  const workflow = parse(await readFile(new URL('sync-skill-references.yml', workflows), 'utf8'))
  assert.deepEqual(workflow.on.pull_request.types, ['opened', 'reopened', 'synchronize'])
  assert.equal(workflow.on.pull_request_target, undefined)
  assert.equal(workflow.on.push, undefined)
  const job = workflow.jobs.sync
  assert.ok(job.if.includes('github.event.pull_request.head.repo.full_name == github.repository'))
  assert.ok(
    job.if.includes('github.event.pull_request.head.ref != github.event.repository.default_branch'),
  )
  assert.deepEqual(job.permissions, { contents: 'write', actions: 'write' })
  const checkout = job.steps.find((step) => step.uses?.startsWith('actions/checkout@'))
  assert.equal(checkout.with.ref, '${{ github.event.pull_request.head.sha }}')
  assert.equal(checkout.with['persist-credentials'], false)
  const installIndex = job.steps.findIndex((step) => step.run === 'bun install --ignore-scripts')
  const syncIndex = job.steps.findIndex((step) => step.run === 'node scripts/sync-skills.mjs')
  const commitIndex = job.steps.findIndex((step) => step.id === 'commit')
  assert.ok(installIndex >= 0 && syncIndex > installIndex && commitIndex > syncIndex)
  assert.equal(job.steps[installIndex].env?.GH_TOKEN, undefined)
  assert.equal(job.steps[syncIndex].env?.GH_TOKEN, undefined)
  const commit = job.steps[commitIndex]
  assert.ok(commit.run.includes("git add -- ':(glob)skills/*/reference/**'"))
  assert.ok(commit.run.includes('commit --signoff'))
  assert.ok(commit.run.includes('git push origin "HEAD:refs/heads/$PR_BRANCH"'))
  assert.ok(!commit.run.includes('--force'))
  const dispatchIndex = job.steps.findIndex(
    (step) =>
      step.run ===
      'gh workflow run ci.yml --ref "$PR_BRANCH" --field docs_base_revision="$PR_BASE_SHA"',
  )
  assert.ok(dispatchIndex > commitIndex)
  assert.equal(job.steps[dispatchIndex].if, "steps.commit.outputs.pushed == 'true'")
  assert.equal(
    job.steps[dispatchIndex].env.PR_BASE_SHA,
    '${{ github.event.pull_request.base.sha }}',
  )
})

test('dispatched CI preserves the original pull request documentation baseline', async () => {
  const workflow = parse(await readFile(new URL('ci.yml', workflows), 'utf8'))
  const input = workflow.on.workflow_dispatch.inputs.docs_base_revision
  assert.equal(input.type, 'string')
  assert.equal(input.required, false)
  const baselines = workflow.jobs.sites.steps
    .map((step) => step.env?.DOCS_BASE_REVISION)
    .filter(Boolean)
  assert.ok(baselines.length)
  for (const baseline of baselines)
    assert.ok(
      baseline.includes('github.event.pull_request.base.sha || inputs.docs_base_revision ||'),
    )
})
