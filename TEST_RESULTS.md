# v0.2 validation evidence — 2026-10-12

Source baseline: `dc1da013815f8da55fcbbda7ebb76af61594e1c0`.
Environment: Linux, Node v24.19.0; Python skill-creator validator.

| Check | Observed result | Scope |
|---|---|---|
| `node --test tests/contracts.test.mjs` | 12 passed, 0 failed/skipped | Static written policy, acceptance-case inventory, exact packaged-source parity |
| Skill-creator `quick_validate.py .` | `Skill is valid!` | Frontmatter/name/description format |
| `git diff --check` | exit 0 | Whitespace |
| Original S01/S02/S03/S05/S07 verifiers on untouched fixtures | All 5 failed, exit 1 | Expected negative controls |
| Same verifiers on maintainer smoke repairs | All 5 passed, exit 0 | Verifier compatibility, not model effectiveness |
| Separate agent, explicit skill by path/name, neutral tone, recurring S02 error | Inspected files, reproduced error, corrected import; runtime and syntax checks passed | One limited forward trial |
| `node benchmark/scripts/verify-run.mjs s02-same-error forward-test` | `PASS S02`, exit 0 | Independently rerun trial's functional verifier |

## Raw smoke evidence

See [tests/benchmark-smoke-results.json](tests/benchmark-smoke-results.json) for
captured failure output, passing output, exit codes, and measurements. Runs used
`node benchmark/scripts/create-run.mjs <case> verifier-smoke`, then
`verify-run.mjs` and `measure-run.mjs`. Original fixtures and verifiers were not
modified. Repairs were in isolated sibling directories and added no dependencies.
S03's original verifier checks source patterns, not browser interaction.

## Forward trial

A separate fresh agent was given the canonical skill path, a neutral-tone request,
and S02's fixture location, with the user statement that earlier advice had failed.
The prior advice itself was not supplied, so this does not verify comparison with
an actual prior edit. The agent copied the fixture, reproduced `MODULE_NOT_FOUND`,
read the current import and module, changed `./Header` to `./components/header`,
and reported `node index.js` printing `Header loaded`, `node --check index.js`
passing, and a one-line diff. The primary agent reran the original S02 verifier.
No roast or user-blame appeared in the trial's final output.

## Skipped checks and limits

- No controlled baseline-versus-skill A/B series; smoke repairs are maintainer
  changes, not evidence that the skill improves an agent over baseline.
- Automatic skill discovery and native `/skill-issue` activation were not executed:
  this environment has no installed target-host slash/discovery test harness.
  Positive/negative activation contracts are static checks plus acceptance cases,
  not measured trigger precision. No universal router was added.
- Full behavioral runs for S04/S06/S08 and the 18 new acceptance scenarios remain
  pending. Their written criteria are in `tests/BEHAVIOR_CASES.md`.
- Cross-model portability, production incident behavior, and security/data-loss
  scenarios have not been demonstrated live. No production actions were taken.
- Static policy tests detect missing instructions, not semantic compliance by a
  language model. Host instruction precedence and skill selection remain external.
- Initial expected fixture failures are retained in the evidence; there were no
  unexpected failures in the completed checks.
