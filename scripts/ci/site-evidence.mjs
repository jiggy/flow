import { access } from 'node:fs/promises'
import { join } from 'node:path'
const [directory, revision] = process.argv.slice(2)
if (!/^[a-f0-9]{40}$/.test(revision || '')) throw new Error('Expected exact site source revision')
for (const file of ['index.html', 'llms.txt', 'llms-full.txt']) await access(join(directory, file))
console.log(`Checked FLOW site source ${revision}`)
