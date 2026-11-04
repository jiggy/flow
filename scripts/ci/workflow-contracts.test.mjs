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

test('source CI has read-only permissions and leaves skill generation to jiggy/skills', async () => {
  const workflow = parse(await readFile(new URL('ci.yml', workflows), 'utf8'))
  const job = workflow.jobs['quick-checks']
  const permissions = job.permissions ?? workflow.permissions
  assert.equal(permissions.contents, 'read')
  assert.ok(job.steps.some((step) => step.run === 'just test-tooling'))
  assert.doesNotMatch(JSON.stringify(workflow), /sync-skills|check-skills|flow-skills-/)
})

test('skill notifications delegate main updates without checking out code or granting repository permissions', async () => {
  const workflow = parse(await readFile(new URL('notify-skills.yml', workflows), 'utf8'))
  assert.deepEqual(workflow.on.push.branches, ['main'])
  assert.ok(Object.hasOwn(workflow.on, 'workflow_dispatch'))
  assert.equal(workflow.on.pull_request, undefined)
  assert.equal(workflow.on.pull_request_target, undefined)
  assert.deepEqual(workflow.on.push.paths, [
    'docs/flow/**',
    'LICENSES.md',
    'Notices.md',
    'LICENSES/**',
    '.github/workflows/notify-skills.yml',
  ])
  assert.deepEqual(workflow.permissions, {})
  assert.deepEqual(Object.keys(workflow.jobs), ['notify'])
  const job = workflow.jobs.notify
  assert.equal(job.if, "github.repository == 'jiggy/flow' && github.ref == 'refs/heads/main'")
  assert.match(
    job.uses,
    /^jiggy\/skills\/\.github\/workflows\/notify\.yml@[a-f0-9]{40}$/,
  )
  assert.equal(job.steps, undefined)
  assert.equal(job.permissions, undefined)
  assert.deepEqual(job.secrets, { 'dispatch-token': '${{ secrets.SKILLS_DISPATCH_TOKEN }}' })
})

test('documentation checks retain PR and push baselines with a manual-run parent fallback', async () => {
  const workflow = parse(await readFile(new URL('ci.yml', workflows), 'utf8'))
  assert.equal(workflow.on.workflow_dispatch, null)
  const baselines = workflow.jobs.sites.steps
    .map((step) => step.env?.DOCS_BASE_REVISION)
    .filter(Boolean)
  assert.ok(baselines.length)
  for (const baseline of baselines) {
    assert.ok(baseline.includes('github.event.pull_request.base.sha ||'))
    assert.ok(baseline.includes('github.event.before'))
    assert.ok(baseline.includes("format('{0}^', github.sha)"))
    assert.ok(!baseline.includes('inputs.docs_base_revision'))
  }
})
