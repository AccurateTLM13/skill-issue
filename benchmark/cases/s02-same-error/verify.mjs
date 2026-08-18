import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
const runDir = process.argv[2];
const r = spawnSync(process.execPath, ['index.js'], { cwd: runDir, encoding: 'utf8' });
assert.equal(r.status, 0, r.stderr || 'index.js should run successfully');
assert.match(r.stdout, /Header loaded/);
console.log('PASS S02');
