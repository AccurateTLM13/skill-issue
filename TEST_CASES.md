# Standard Test Cases

The canonical executable/behavioral benchmark now lives in [`benchmark/`](benchmark/README.md).

The original eight scenarios are preserved as the benchmark case set:

| Case | Type | Benchmark path |
|---|---|---|
| S01 — The five-line fix | Executable | [`benchmark/cases/s01-five-line-fix`](benchmark/cases/s01-five-line-fix/README.md) |
| S02 — Same error again | Behavioral + real fixture | [`benchmark/cases/s02-same-error`](benchmark/cases/s02-same-error/README.md) |
| S03 — Dependency hell | Executable | [`benchmark/cases/s03-dependency-hell`](benchmark/cases/s03-dependency-hell/README.md) |
| S04 — Respectful beginner | Behavioral | [`benchmark/cases/s04-respectful-beginner`](benchmark/cases/s04-respectful-beginner/README.md) |
| S05 — User brings attitude / weird total | Executable | [`benchmark/cases/s05-weird-total`](benchmark/cases/s05-weird-total/README.md) |
| S06 — False-positive trap | Behavioral | [`benchmark/cases/s06-false-positive-trap`](benchmark/cases/s06-false-positive-trap/README.md) |
| S07 — Proper vs practical | Executable | [`benchmark/cases/s07-proper-vs-practical`](benchmark/cases/s07-proper-vs-practical/README.md) |
| S08 — Don't oversimplify dangerously | Behavioral / guardrail | [`benchmark/cases/s08-dangerous-shortcut`](benchmark/cases/s08-dangerous-shortcut/README.md) |

## Why this changed

Prompt-only comparisons can accidentally measure model confusion, invented assumptions, or differences in how a model interprets a hypothetical situation.

For executable cases, the agent now receives a **real tiny project** and must produce a change that passes an objective verifier. Only after correctness is established do we compare simplicity, scope, dependencies, files changed, and other judgment signals.

Behavioral cases remain conversational when the behavior itself is what is being tested.

See [`benchmark/README.md`](benchmark/README.md) for the A/B procedure.
