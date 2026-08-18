# Skill Issue Benchmark

This benchmark tests whether **Skill Issue changes engineering judgment without sacrificing correctness**.

It uses two kinds of cases:

1. **Executable cases** — the agent edits a real tiny project and must pass a verifier.
2. **Behavioral cases** — the agent is scored on restraint, tone, repetition handling, and safety when a code change is not the point.

## Isolation rule

Baseline runs must not be able to discover the repo's root `SKILL.md`.

`create-run.mjs` therefore creates working copies in a sibling directory outside the repo:

```text
../skill-issue-runs/<case>/<variant>/
```

The script prints the exact run path. Point the coding agent at that directory, not at the Skill Issue repository.

## Quick start

Create a clean baseline copy:

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell baseline
```

Give the agent the copied `TASK.md` verbatim. After it finishes:

```bash
node benchmark/scripts/verify-run.mjs s03-dependency-hell baseline
node benchmark/scripts/measure-run.mjs s03-dependency-hell baseline
```

Then create a fresh Skill Issue copy:

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell skill-issue
```

Use the same model, harness, settings, and task with Skill Issue enabled. Never reuse a previous working directory.

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

**Functional correctness is a gate.** A run that fails its verifier cannot win because it changed fewer files or lines.

After correctness, compare:

- files changed/added/removed
- total line count before/after and net line-count change
- dependencies before/after and dependencies added
- build/config files introduced
- unnecessary architecture or abstractions
- whether the response stayed direct and useful

These are judgment signals, not an automatic score. A larger change can still be justified.

## A/B protocol

1. Lock one exact model and harness.
2. Create a fresh baseline run with no Skill Issue available.
3. Use the task verbatim and save the transcript.
4. Verify and measure.
5. Create a fresh Skill Issue run from the untouched fixture.
6. Change only whether Skill Issue is enabled.
7. Use the same task, save the transcript, verify, and measure.
8. Compare only after both runs are complete.

See each case's `README.md` for case-specific instructions.
