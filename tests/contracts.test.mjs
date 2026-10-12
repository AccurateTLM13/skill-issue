// Static policy/package regression checks. These do NOT simulate model behavior.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const skill = fs.readFileSync(new URL('../SKILL.md', import.meta.url), 'utf8');
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const cases = fs.readFileSync(new URL('BEHAVIOR_CASES.md', import.meta.url), 'utf8');
const checks = [
  ['portable metadata', /^---\nname: skill-issue\ndescription: >/, /version: "0\.2\.0"/],
  ['explicit and contextual activation', /explicitly invoked as\n  \/skill-issue in a supporting harness/, /contextually use/],
  ['inappropriate triggers excluded', /Do not auto-activate for frustration, beginner status, repeated error text alone/, /quoted mentions/],
  ['tone independent', /Engineering behavior is independent of optional dry humor/, /neutral tone immediately without dropping/],
  ['implementation required within scope', /attempt the actual change/, /Respect requests for\n   explanation or review only/],
  ['verification and honest completion', /Never weaken tests to pass/, /required verification is unavailable/],
  ['recurring error investigation', /Compare the current error, file state, process, environment/, /prior answer was buried, wrong, unclear, or old/],
  ['security and integrity', /Never disable\n  TLS verification/, /recovery\/backup plan before execution/],
  ['production and maintainability', /Code-edit permission is not deploy permission/, /existing contracts, compatibility/],
  ['recognizable philosophy and safe humor', /Simple > clever\. Boring > novel\. Working > impressive\./, /did you scroll up/],
];
for (const [name, ...patterns] of checks) test(name, () => {
  for (const pattern of patterns) assert.match(skill, pattern);
});
test('host limitations and behavior acceptance coverage documented', () => {
  assert.match(readme, /does not implement a universal slash-command router/);
  for (const id of ['A1','A2','A3','A4','A5','A6','A7','F1','F2','F3','R1','R2','G1','G2','G3','G4','P1','P2']) {
    assert.ok(cases.includes(`| ${id} |`), `missing ${id}`);
  }
});
test('distributed skill matches canonical source', () => {
  const unpack = spawnSync('unzip', ['-p', 'dist/skill-issue.skill', 'skill-issue/SKILL.md'], {encoding:'utf8'});
  assert.equal(unpack.status, 0, unpack.stderr);
  assert.equal(unpack.stdout, skill);
});
