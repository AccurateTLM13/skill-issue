import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const benchmarkRoot = path.resolve(__dirname, '..');
const [caseName, variant] = process.argv.slice(2);

if (!caseName || !variant) {
  console.error('Usage: node benchmark/scripts/measure-run.mjs <case-name> <variant>');
  process.exit(1);
}

const fixtureDir = path.join(benchmarkRoot, 'cases', caseName, 'fixture');
const runDir = path.join(benchmarkRoot, 'runs', caseName, variant);

function walk(root) {
  const out = new Map();
  if (!fs.existsSync(root)) return out;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name === 'TASK.md' || entry.name === 'node_modules') continue;
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      for (const [k, v] of walk(full)) out.set(path.join(entry.name, k), v);
    } else {
      out.set(entry.name, fs.readFileSync(full));
    }
  }
  return out;
}

function lineCount(buf) {
  if (!buf?.length) return 0;
  return buf.toString('utf8').split(/\r?\n/).length;
}

const before = walk(fixtureDir);
const after = walk(runDir);
const all = new Set([...before.keys(), ...after.keys()]);
let changed = 0, added = 0, removed = 0, linesBefore = 0, linesAfter = 0;

for (const file of all) {
  const a = before.get(file);
  const b = after.get(file);
  linesBefore += lineCount(a);
  linesAfter += lineCount(b);
  if (!a && b) { added++; changed++; continue; }
  if (a && !b) { removed++; changed++; continue; }
  if (a && b && !a.equals(b)) changed++;
}

let dependencies = 0;
const packagePath = path.join(runDir, 'package.json');
if (fs.existsSync(packagePath)) {
  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    dependencies = Object.keys({ ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }).length;
  } catch {}
}

const buildFiles = ['package.json','vite.config.js','vite.config.ts','webpack.config.js','tailwind.config.js','tailwind.config.ts','tsconfig.json'];
const introducedBuildFiles = buildFiles.filter(name => !fs.existsSync(path.join(fixtureDir, name)) && fs.existsSync(path.join(runDir, name)));

console.log(JSON.stringify({
  case: caseName,
  variant,
  filesChanged: changed,
  filesAdded: added,
  filesRemoved: removed,
  totalLinesBefore: linesBefore,
  totalLinesAfter: linesAfter,
  netLineChange: linesAfter - linesBefore,
  dependenciesPresent: dependencies,
  introducedBuildFiles
}, null, 2));
