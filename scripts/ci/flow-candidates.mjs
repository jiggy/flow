import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { lstat, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { promoteDirectory } from '../promote-directory.mjs'

export const PACKAGES = Object.freeze({
  'flow-sdk': '@jigging/flow',
  'flow-authoring': '@jigging/flow-authoring',
})
export const hash = (bytes) => createHash('sha256').update(bytes).digest('hex')
const run = (command, args, options = {}) =>
  execFileSync(command, args, { stdio: 'inherit', timeout: 600_000, ...options })

export async function buildCandidates(destination) {
  const repository = resolve(import.meta.dirname, '../..')
  const sourceRevision = execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: repository,
    encoding: 'utf8',
  }).trim()
  if (execFileSync('git', ['status', '--porcelain'], { cwd: repository, encoding: 'utf8' }).trim())
    throw new Error('Candidate source must be clean')
  const target = resolve(destination)
  try {
    await lstat(target)
    throw new Error('Candidate destination already exists')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  await mkdir(dirname(target), { recursive: true })
  const output = await mkdtemp(join(dirname(target), '.flow-candidates-'))
  let staging = output
  const temporary = await mkdtemp(join(tmpdir(), 'flow-candidates-'))
  try {
    const source = join(temporary, 'source')
    await mkdir(source)
    const archive = join(temporary, 'source.tar')
    run('git', ['archive', '--format=tar', `--output=${archive}`, sourceRevision], {
      cwd: repository,
    })
    run('tar', ['-xf', archive, '-C', source])
    run('bun', ['install', '--ignore-scripts'], { cwd: source })
    run('just', ['build'], { cwd: source })
    const packages = []
    for (const [directory, name] of Object.entries(PACKAGES)) {
      const target = join(output, directory)
      await mkdir(target)
      run('bun', ['pm', 'pack', '--ignore-scripts', '--destination', target], {
        cwd: join(source, 'packages', directory),
      })
      const files = (await readdir(target)).filter((path) => path.endsWith('.tgz'))
      if (files.length !== 1) throw new Error(`Incomplete ${name} candidate`)
      const manifest = JSON.parse(
        execFileSync('tar', ['-xOzf', join(target, files[0]), 'package/package.json'], {
          encoding: 'utf8',
        }),
      )
      if (
        manifest.name !== name ||
        manifest.private === true ||
        manifest.publishConfig?.access !== 'public'
      )
        throw new Error('Candidate is not the expected public package')
      packages.push({
        name,
        version: manifest.version,
        path: `${directory}/${files[0]}`,
        sha256: hash(await readFile(join(target, files[0]))),
      })
    }
    run(
      process.env.PYTHON || 'python3',
      [
        join(repository, 'scripts/build-python-sdk.py'),
        join(output, 'python'),
        '--candidate',
        '--build-only',
      ],
      { cwd: repository },
    )
    const python = JSON.parse(await readFile(join(output, 'python/SUCCESS.json'), 'utf8'))
    if (python.commit !== sourceRevision || python.candidate !== true)
      throw new Error('Python candidate source changed during construction')
    for (const [name, sha256] of Object.entries(python.files))
      packages.push({ name: 'jiggy-flow', version: python.version, path: `python/${name}`, sha256 })
    await mkdir(join(output, 'resolution'))
    const resolution = await readFile(join(source, 'bun.lock'))
    await writeFile(join(output, 'resolution/bun.lock'), resolution)
    const receipt = {
      schemaVersion: 1,
      sourceRevision,
      packages,
      resolutionSha256: hash(resolution),
      qualification: 'pending',
    }
    await writeFile(join(output, 'CANDIDATE.json'), JSON.stringify(receipt, null, 2) + '\n')
    await writeFile(
      join(output, 'SHA256SUMS'),
      packages.map((entry) => `${entry.sha256}  ${entry.path}`).join('\n') + '\n',
    )
    await promoteDirectory(output, target)
    staging = undefined
    return receipt
  } finally {
    await rm(temporary, { recursive: true, force: true })
    if (staging) await rm(staging, { recursive: true, force: true })
  }
}

export async function verifyCandidate(directory, sourceRevision) {
  const root = resolve(directory)
  const receipt = JSON.parse(await readFile(join(root, 'CANDIDATE.json'), 'utf8'))
  if (
    receipt.schemaVersion !== 1 ||
    !/^[a-f0-9]{40}$/.test(receipt.sourceRevision) ||
    receipt.sourceRevision !== sourceRevision ||
    receipt.qualification !== 'pending'
  )
    throw new Error('Candidate source identity mismatch')
  if (!Array.isArray(receipt.packages) || receipt.packages.length !== 4)
    throw new Error('Incomplete candidate package set')
  const paths = new Set()
  for (const entry of receipt.packages) {
    if (
      typeof entry.path !== 'string' ||
      !/^(?:flow-sdk|flow-authoring|python)\/[A-Za-z0-9_.-]+$/.test(entry.path) ||
      paths.has(entry.path) ||
      !/^[a-f0-9]{64}$/.test(entry.sha256)
    )
      throw new Error('Unsafe or repeated candidate path')
    paths.add(entry.path)
    const { lstat } = await import('node:fs/promises')
    if (
      !(await lstat(join(root, dirname(entry.path)))).isDirectory() ||
      !(await lstat(join(root, entry.path))).isFile()
    )
      throw new Error('Candidate paths must be regular files')
    if (hash(await readFile(join(root, entry.path))) !== entry.sha256)
      throw new Error('Candidate archive changed')
    if (entry.path.endsWith('.tgz')) {
      const manifest = JSON.parse(
        execFileSync('tar', ['-xOzf', join(root, entry.path), 'package/package.json'], {
          encoding: 'utf8',
        }),
      )
      const expected = PACKAGES[entry.path.split('/')[0]]
      if (
        !expected ||
        entry.name !== expected ||
        manifest.name !== expected ||
        manifest.version !== entry.version ||
        manifest.private === true ||
        manifest.publishConfig?.access !== 'public'
      )
        throw new Error('Candidate manifest mismatch')
    } else if (
      entry.name !== 'jiggy-flow' ||
      !entry.path.startsWith(`python/jiggy_flow-${entry.version}`)
    )
      throw new Error('Python candidate mismatch')
  }
  for (const directory of Object.keys(PACKAGES))
    if (receipt.packages.filter((entry) => entry.path.startsWith(`${directory}/`)).length !== 1)
      throw new Error('Missing npm candidate')
  const pythonEntries = receipt.packages.filter((entry) => entry.name === 'jiggy-flow')
  if (
    pythonEntries.length !== 2 ||
    new Set(pythonEntries.map((entry) => entry.version)).size !== 1 ||
    !pythonEntries.some(
      (entry) => entry.path === `python/jiggy_flow-${entry.version}-py3-none-any.whl`,
    ) ||
    !pythonEntries.some((entry) => entry.path === `python/jiggy_flow-${entry.version}.tar.gz`)
  )
    throw new Error('Incomplete Python formats')
  if (hash(await readFile(join(root, 'resolution/bun.lock'))) !== receipt.resolutionSha256)
    throw new Error('Candidate resolution changed')
  return receipt
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [command, directory, source] = process.argv.slice(2)
  if (command === 'build' && directory && !source) await buildCandidates(directory)
  else if (command === 'verify' && directory && source) await verifyCandidate(directory, source)
  else throw new Error('Use build <fresh-directory> or verify <directory> <source-revision>')
}
