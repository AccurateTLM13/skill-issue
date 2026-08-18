import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
const runDir = process.argv[2];
const require = createRequire(import.meta.url);
const { total } = require(path.join(runDir, 'pricing.js'));
assert.equal(total(10, 1.25), 11.25);
assert.equal(typeof total(10, 1.25), 'number');
console.log('PASS S05');
