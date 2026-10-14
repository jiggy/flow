import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, test } from 'node:test'

const affectedManifest = JSON.parse(readFileSync(new URL('./test-suites.json', import.meta.url)))

import {
  discoverRepositoryTests,
  filesForTarget,
  gitRepositoryTests,
  reconcileSuiteInventory,
} from './suite-inventory.mjs'

const roots = []
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true })
})
function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'jig-suite-inventory-'))
  roots.push(root)
  execFileSync('git', ['-C', root, 'init', '--quiet'])
  execFileSync('git', ['-C', root, 'config', 'user.email', 'fixture@example.invalid'])
  execFileSync('git', ['-C', root, 'config', 'user.name', 'fixture'])
  return root
}
function write(root, path, body = 'test("case",()=>{})') {
  mkdirSync(dirname(join(root, path)), { recursive: true })
  writeFileSync(join(root, path), body)
}

test('local discovery observes additions and deletions while pinned Git inventory keeps exact regular source', () => {
  const root = fixture()
  const retained = 'packages/jig/test/portable/retained.test.ts'
  write(root, retained)
  execFileSync('git', ['-C', root, 'add', '.'])
  execFileSync('git', ['-C', root, 'commit', '--quiet', '-m', 'source'])
  rmSync(join(root, retained))
  const fresh = 'packages/display-web/test/nested/fresh.spec.mjs'
  write(root, fresh)
  write(root, 'packages/display-web/test/node_modules/dependency.test.ts')
  write(root, 'packages/display-web/test/.hidden/secret.test.ts')
  symlinkSync(join(root, fresh), join(root, 'packages/display-web/test/alias.test.ts'))
  assert.deepEqual(discoverRepositoryTests(root, affectedManifest), [fresh])
  assert.deepEqual(gitRepositoryTests(root, 'HEAD'), [retained])
  execFileSync('git', ['-C', root, 'add', '--all'])
  execFileSync('git', ['-C', root, 'commit', '--quiet', '-m', 'new inventory'])
  assert.throws(() => gitRepositoryTests(root, 'HEAD'), /symbolic link/)
})

test('FLOW source and protocol ownership includes both SDKs and independent authoring', () => {
  const files = [
    'packages/flow-sdk/test/session.test.ts',
    'packages/flow-authoring/test/authoring.node.mjs',
    'conformance/run-0/schema.test.ts',
    'packages/jiggy-flow/tests/test_runtime.py',
    'conformance/run-0/python-peer/test_channels.py',
  ]
  const inventory = reconcileSuiteInventory(files, affectedManifest)
  assert.deepEqual(inventory.errors, [])
  assert.deepEqual(
    filesForTarget(files, 'source-protocol', affectedManifest),
    files.slice(0, 3).sort(),
  )
  assert.deepEqual(filesForTarget(files, 'source-python', affectedManifest), files.slice(3).sort())
})
test('unknown, duplicate, linked and ambiguous tests cannot inherit FLOW execution', () => {
  const known = 'packages/flow-sdk/test/known.test.ts'
  assert.match(
    reconcileSuiteInventory(['packages/new/test/new.test.ts'], affectedManifest).errors.join('\n'),
    /Unowned/,
  )
  assert.match(
    reconcileSuiteInventory([known, known], affectedManifest).errors.join('\n'),
    /Repeated/,
  )
  assert.match(
    reconcileSuiteInventory([{ path: known, mode: '120000' }], affectedManifest).errors.join('\n'),
    /Non-regular/,
  )
  const changed = structuredClone(affectedManifest)
  changed.testSuites.push({
    id: 'conflict',
    roots: ['packages/flow-sdk/'],
    profiles: ['portable-linux'],
  })
  assert.match(reconcileSuiteInventory([known], changed).errors.join('\n'), /Ambiguous/)
  assert.match(
    reconcileSuiteInventory(['packages/jig/test/host.test.ts'], affectedManifest).errors.join('\n'),
    /Unowned/,
  )
})
