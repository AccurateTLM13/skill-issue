import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const benchmarkRoot = path.resolve(__dirname, '..');
const [caseName, variant] = process.argv.slice(2);

if (!caseName || !variant) {
  console.error('Usage: node benchmark/scripts/create-run.mjs <case-name> <variant>');
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(variant)) {
  console.error('Variant must contain only lowercase letters, numbers, and hyphens.');
  process.exit(1);
}

const caseDir = path.join(benchmarkRoot, 'cases', caseName);
const fixtureDir = path.join(caseDir, 'fixture');
const runDir = path.join(benchmarkRoot, 'runs', caseName, variant);

if (!fs.existsSync(fixtureDir)) {
  console.error(`No executable fixture found for case: ${caseName}`);
  process.exit(1);
}

if (fs.existsSync(runDir)) {
  console.error(`Run already exists: ${runDir}`);
  console.error('Delete it or choose a new variant. Never reuse a prior run for A/B testing.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(runDir), { recursive: true });
fs.cpSync(fixtureDir, runDir, { recursive: true });

const task = path.join(caseDir, 'TASK.md');
if (fs.existsSync(task)) fs.copyFileSync(task, path.join(runDir, 'TASK.md'));

console.log(runDir);
