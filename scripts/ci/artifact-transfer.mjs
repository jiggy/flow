import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Derived from Jig's artifact transfer owner. Validate the complete ZIP before extraction.
export async function extractArtifactZip(archive, destination) {
  const program = `import pathlib, stat, sys, zipfile\nroot=pathlib.Path(sys.argv[2])\nwith zipfile.ZipFile(sys.argv[1]) as z:\n entries=z.infolist()\n if len(entries)>100000 or sum(e.file_size for e in entries)>1024*1024*1024: raise ValueError('oversized artifact')\n seen=set()\n for e in entries:\n  p=pathlib.PurePosixPath(e.filename)\n  mode=e.external_attr>>16\n  if not e.filename or e.filename.startswith('/') or '\\\\' in e.filename or any(x in ('', '.', '..') for x in e.filename.rstrip('/').split('/')) or str(p) in seen or (stat.S_IFMT(mode) not in (0, stat.S_IFREG, stat.S_IFDIR)): raise ValueError('unsafe artifact entry')\n  seen.add(str(p))\n for e in entries:\n  target=root.joinpath(*pathlib.PurePosixPath(e.filename).parts)\n  if e.is_dir(): target.mkdir(parents=True, exist_ok=True)\n  else:\n   target.parent.mkdir(parents=True, exist_ok=True)\n   with target.open('xb') as f: f.write(z.read(e))\n`
  await mkdir(destination)
  execFileSync('python3', ['-c', program, archive, destination], {
    stdio: 'pipe',
    maxBuffer: 1024 * 1024,
    timeout: 60_000,
  })
}

export async function downloadArtifact(
  repository,
  authorization,
  destination,
  { download, extract = extractArtifactZip } = {},
) {
  const temporary = await mkdtemp(join(tmpdir(), 'flow-artifact-'))
  try {
    const bytes = download
      ? await download(authorization.artifactId)
      : execFileSync(
          'gh',
          ['api', `repos/${repository}/actions/artifacts/${authorization.artifactId}/zip`],
          { timeout: 60_000, maxBuffer: 128 * 1024 * 1024 },
        )
    if (
      'sha256:' + createHash('sha256').update(bytes).digest('hex') !==
      authorization.artifactDigest
    )
      throw new Error('GitHub artifact transport digest mismatch')
    const archive = join(temporary, 'artifact.zip')
    await writeFile(archive, bytes)
    await extract(archive, destination)
  } finally {
    await rm(temporary, { recursive: true, force: true })
  }
}
