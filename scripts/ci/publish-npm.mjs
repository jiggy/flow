import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { authorize } from './flow-release.mjs'
import { verifyCandidate } from './flow-candidates.mjs'

const execute = (args) => execFileSync('npm', args, { encoding: 'utf8', timeout: 120_000 })
function optionalView(args, run) {
  try {
    const output = run(['view', ...args, '--json']).trim()
    return output ? JSON.parse(output) : undefined
  } catch (error) {
    let response
    try {
      response = JSON.parse(error.stdout)
    } catch {
      throw error
    }
    if (response.error?.code !== 'E404') throw error
    return undefined
  }
}
export function comparePrerelease(left, right) {
  const parse = (value) => {
    const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)-(alpha|next)\.(0|[1-9]\d*)$/.exec(
      value,
    )
    if (!match) throw new Error('Unsupported registry prerelease identity')
    return match.slice(1)
  }
  const a = parse(left),
    b = parse(right)
  for (const index of [0, 1, 2])
    if (BigInt(a[index]) !== BigInt(b[index])) return BigInt(a[index]) > BigInt(b[index]) ? 1 : -1
  if (a[3] !== b[3]) return a[3] > b[3] ? 1 : -1
  return BigInt(a[4]) === BigInt(b[4]) ? 0 : BigInt(a[4]) > BigInt(b[4]) ? 1 : -1
}

export async function publishNpm(
  directory,
  {
    run = execute,
    reauthorize = authorize,
    verify = verifyCandidate,
    pause = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  } = {},
) {
  const root = resolve(directory)
  const snapshot = JSON.parse(await readFile(join(root, 'AUTHORIZATION.json'), 'utf8'))
  const receipt = await verify(root, snapshot.source)
  const plans = []
  // Complete registry reconciliation precedes every package mutation.
  for (const entry of receipt.packages.filter((entry) => entry.path.endsWith('.tgz'))) {
    const path = join(root, entry.path)
    const bytes = await readFile(path)
    if (createHash('sha256').update(bytes).digest('hex') !== entry.sha256)
      throw new Error('Candidate changed before publication')
    const integrity = 'sha512-' + createHash('sha512').update(bytes).digest('base64')
    const existing = optionalView([`${entry.name}@${entry.version}`, 'dist.integrity'], run)
    if (existing !== undefined && existing !== integrity)
      throw new Error(`Registry version has different bytes: ${entry.name}@${entry.version}`)
    const tag = entry.version.match(/-(alpha|next)\./)?.[1]
    if (!tag) throw new Error('Expected alpha or next candidate')
    const tagged = optionalView([entry.name, `dist-tags.${tag}`], run)
    const superseded = tagged !== undefined && comparePrerelease(tagged, entry.version) > 0
    plans.push({ entry, path, integrity, tag, skip: existing !== undefined || superseded })
  }
  for (const plan of plans) {
    const current = await reauthorize(snapshot.runId, snapshot.attempt)
    for (const key of ['source', 'artifactId', 'artifactDigest', 'runId', 'attempt'])
      if (current[key] !== snapshot[key])
        throw new Error('Queued publication authorization changed')
    await verify(root, snapshot.source)
    if (plan.skip) {
      console.log(`Already published or superseded ${plan.entry.name}@${plan.entry.version}`)
      continue
    }
    run([
      'publish',
      plan.path,
      '--access',
      'public',
      '--tag',
      plan.tag,
      '--provenance',
      '--ignore-scripts',
    ])
    for (let attempt = 0; ; attempt++) {
      const actual = optionalView(
        [`${plan.entry.name}@${plan.entry.version}`, 'dist.integrity'],
        run,
      )
      if (actual === plan.integrity) break
      if (actual !== undefined) throw new Error('Published registry version has different bytes')
      if (attempt === 60)
        throw new Error(
          'Published registry bytes remained unavailable after five minutes; retry publication',
        )
      if (attempt === 0)
        console.log(`Waiting for registry visibility: ${plan.entry.name}@${plan.entry.version}`)
      await pause(5_000)
    }
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  await publishNpm(process.argv[2])
