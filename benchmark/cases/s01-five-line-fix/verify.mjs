import assert from 'node:assert/strict';
import path from 'node:path';
import { createRequire } from 'node:module';
import fs from 'node:fs';

const runDir = process.argv[2];
if (!runDir) throw new Error('Run directory required');

const appPath = path.join(runDir, 'app.js');
assert.ok(fs.existsSync(appPath), 'app.js must still exist');

let scheduled;
const originalSetTimeout = global.setTimeout;
global.setTimeout = (fn, ms) => { scheduled = { fn, ms }; return 1; };

try {
  const require = createRequire(import.meta.url);
  delete require.cache[require.resolve(appPath)];
  const { submitOrder } = require(appPath);
  let sends = 0;
  const send = async () => { sends++; };

  const first = await submitOrder(send);
  const second = await submitOrder(send);

  assert.equal(first, true, 'first submission should proceed');
  assert.equal(second, false, 'second immediate submission should be blocked');
  assert.equal(sends, 1, 'send should only run once while locked');
  assert.ok(scheduled, 'unlock should be scheduled');
  assert.equal(scheduled.ms, 2000, 'lock window should be two seconds');

  scheduled.fn();
  const third = await submitOrder(send);
  assert.equal(third, true, 'submission should work again after unlock');
  assert.equal(sends, 2, 'send should run again after unlock');
  console.log('PASS S01');
} finally {
  global.setTimeout = originalSetTimeout;
}
