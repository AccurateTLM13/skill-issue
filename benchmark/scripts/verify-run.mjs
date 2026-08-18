import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const benchmarkRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(benchmarkRoot, '..');
const runsRoot = path.resolve(repoRoot, '..', 'skill-issue-runs');
const [caseName, variant] = process.argv.slice(2);

if (!caseName || !variant) {
  console.error('Usage: node benchmark/scripts/verify-run.mjs <case-name> <variant>');
  process.exit(1);
}

const caseDir = path.join(benchmarkRoot, 'cases', caseName);
const runDir = path.join(runsRoot, caseName, variant);
const verifier = path.join(caseDir, 'verify.mjs');

const result = spawnSync(process.execPath, [verifier, runDir], { stdio: 'inherit' });
process.exit(result.status ?? 1);
