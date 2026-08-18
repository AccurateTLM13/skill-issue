# Skill Issue

> Your coding agent has patience. This skill doesn't.

**Skill Issue** pushes AI coding agents toward smaller fixes, less unnecessary architecture, fewer repeated explanations, and more practical follow-through.

The attitude is optional. The competence is not.

> **Simple > clever. Boring > novel. Working > impressive.**

## Install

```bash
npx skills add AccurateTLM13/skill-issue
```

Global install:

```bash
npx skills add AccurateTLM13/skill-issue -g
```

Try it without permanently installing:

```bash
npx skills use AccurateTLM13/skill-issue --skill skill-issue
```

Manual options: use [`SKILL.md`](SKILL.md) directly, or download [`dist/skill-issue.skill`](dist/skill-issue.skill?raw=1) for compatible harnesses.

## What it changes

Skill Issue biases an agent toward:

- the smallest real fix instead of the cleverest architecture
- working code before theory
- cutting scope creep and unnecessary dependencies
- recognizing repeated questions without inventing new theories
- asking fewer blocking questions
- explaining the failure without turning every bug into a lecture
- light roasting of the *situation*, never the person

Correctness outranks the bit. A shorter answer that is wrong is still wrong.

## Benchmark

The repo includes a small A/B benchmark with real fixtures and objective verifiers. Executable cases must work before simplicity counts as a win; behavioral cases test restraint, tone, repetition handling, and safety.

Generated runs are created in a sibling `skill-issue-runs/` directory **outside this repo** so the baseline agent cannot accidentally discover the root `SKILL.md`.

Example with S03:

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell baseline
# run the baseline agent against the printed directory
node benchmark/scripts/verify-run.mjs s03-dependency-hell baseline
node benchmark/scripts/measure-run.mjs s03-dependency-hell baseline

node benchmark/scripts/create-run.mjs s03-dependency-hell skill-issue
# repeat with the same model/settings and Skill Issue enabled
node benchmark/scripts/verify-run.mjs s03-dependency-hell skill-issue
node benchmark/scripts/measure-run.mjs s03-dependency-hell skill-issue
```

The measurement report shows files changed, line-count change, dependencies before/after/added, and introduced build/config files.

[Read the benchmark methodology →](benchmark/README.md)

## Agent Skills format

[`SKILL.md`](SKILL.md) is the canonical Agent Skills entrypoint and includes `name`, activation-focused `description`, `license: MIT`, author metadata, and version metadata.

## Test and contribute

- [Benchmark](benchmark/README.md)
- [Standard test cases](TEST_CASES.md)
- [Testing/scoring protocol](TESTING.md)
- [Submit a test report](../../issues/new/choose)
- [Contributing guide](CONTRIBUTING.md)

## License and status

MIT licensed. See [LICENSE](LICENSE).

**v0.1.0 is actively being tested across models and agent harnesses.** Results where the baseline wins are just as useful as results where Skill Issue wins.
