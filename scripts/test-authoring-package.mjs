import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const archive = resolve(process.argv[2])
const root = await mkdtemp(join(tmpdir(), 'flow-authoring-installed-'))
try {
  await mkdir(join(root, 'consumer'))
  const consumer = join(root, 'consumer')
  await writeFile(
    join(consumer, 'package.json'),
    JSON.stringify({
      private: true,
      type: 'module',
      dependencies: { '@jigging/flow-authoring': `file:${archive}` },
    }),
  )
  const environment = { PATH: process.env.PATH, HOME: root, npm_config_cache: join(root, 'cache') }
  execFileSync('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], {
    cwd: consumer,
    env: environment,
    stdio: 'inherit',
    timeout: 120_000,
  })
  await writeFile(
    join(consumer, 'smoke.mjs'),
    `import assert from 'node:assert/strict';
import { compileContract, stampSource } from '@jigging/flow-authoring';
const source = await stampSource('import "@jigging/flow-authoring/typespec"; using FLOW; @invocation(Input, Result) namespace Greeting; @closed model Input { name: string; } @closed model Result { outcome: "done"; output: string; }', { types: true });
const result = await compileContract(source);
const contract = JSON.parse(result.artifacts['FLOW.contract.json']);
assert.ok(contract.input);
assert.ok(result.artifacts['FLOW.contract.d.ts']);
assert.equal(result.source, source);
console.log('Installed authoring compilation passed');
`,
  )
  execFileSync(process.execPath, ['smoke.mjs'], {
    cwd: consumer,
    env: environment,
    stdio: 'inherit',
    timeout: 30_000,
  })
  execFileSync(
    process.execPath,
    ['--test', resolve(import.meta.dirname, '../packages/flow-authoring/test/authoring.node.mjs')],
    {
      env: {
        ...environment,
        FLOW_AUTHORING_PACKAGE_ENTRY: pathToFileURL(
          join(consumer, 'node_modules/@jigging/flow-authoring/dist/index.js'),
        ).href,
      },
      stdio: 'inherit',
      timeout: 180_000,
    },
  )
} finally {
  await rm(root, { recursive: true, force: true })
}
