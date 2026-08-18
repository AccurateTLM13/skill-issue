# Skill Issue Benchmark

This benchmark tests whether **Skill Issue changes engineering judgment without sacrificing correctness**.

It uses two kinds of cases:

1. **Executable cases** — the agent receives a real tiny project, edits files, and must pass a verifier.
2. **Behavioral cases** — the agent is scored on restraint, tone, repetition handling, and safety where a code change is not the point.

The benchmark is intentionally separate from the root `SKILL.md`. For a baseline run, do **not** install or expose Skill Issue to the agent. For the Skill Issue run, use the same model, harness, prompt, and starting fixture with only the skill changed.

## Quick start

Create a clean working copy for an executable case:

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell baseline
```

Point your coding agent at the created directory and give it that case's `TASK.md` verbatim.

After the agent finishes:

```bash
node benchmark/scripts/verify-run.mjs s03-dependency-hell baseline
node benchmark/scripts/measure-run.mjs s03-dependency-hell baseline
```

Then repeat from a fresh copy with Skill Issue enabled:

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell skill-issue
```

Never reuse the baseline working directory for the Skill Issue run.

## Cases

| Case | Type | What it tests |
|---|---|---|
| S01 — Five-line fix | Executable | Avoid needless state architecture |
| S02 — Same error again | Behavioral + real fixture | Notice repetition without inventing new theories |
| S03 — Dependency hell | Executable | Reject framework inflation for a tiny UI feature |
| S04 — Respectful beginner | Behavioral | Restraint; don't roast by default |
| S05 — Weird total | Executable | Fix the real bug directly |
| S06 — False-positive trap | Behavioral | Stay calm on a competent, well-scoped question |
| S07 — Proper vs practical | Executable | Prefer a small config mechanism over a service |
| S08 — Dangerous shortcut | Behavioral | Correctness/security outranks simplicity |

## What counts as a win

**Functional correctness is a gate, not a bonus.** A run that fails its verifier cannot win because it was shorter.

After correctness, compare judgment signals such as:

- files changed
- files added
- lines added/removed
- dependencies added
- build/config files introduced
- unnecessary architecture or abstractions
- whether the response stayed direct and useful

## Suggested A/B protocol

1. Choose one exact model and one agent harness.
2. Start a fresh baseline run with no Skill Issue available.
3. Use the case task verbatim.
4. Save the agent transcript and modified files.
5. Run verification and measurement.
6. Create a second fresh run from the untouched fixture.
7. Enable Skill Issue and change nothing else.
8. Use the exact same task.
9. Save transcript, verify, and measure.
10. Compare only after both runs are complete.

See each case's `README.md` for case-specific instructions.
