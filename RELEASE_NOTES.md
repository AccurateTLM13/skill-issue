# v0.1.0 — Public Test

This is the first public test release of **Skill Issue**.

Skill Issue is a behavioral coding skill designed to push AI coding agents toward smaller fixes, less unnecessary architecture, fewer repeated explanations, and more practical follow-through — while preserving correctness and useful help.

## Install

```bash
npx skills add AccurateTLM13/skill-issue
```

For a global install:

```bash
npx skills add AccurateTLM13/skill-issue -g
```

To try it without installing:

```bash
npx skills use AccurateTLM13/skill-issue --skill skill-issue
```

## Included

- Agent Skills-compatible root `SKILL.md`
- packaged `skill-issue.skill`
- controlled baseline-vs-skill testing protocol
- eight standard test scenarios
- GitHub issue template for submitting results

## What to test

Use the same model, prompt, and context twice:

1. baseline agent without Skill Issue
2. same agent with Skill Issue enabled

Compare whether the skill improves:

- correctness
- directness
- simplicity
- scope control
- explanation quality
- tone
- follow-through

Pay particular attention to false positives. A calm, experienced developer asking a well-scoped question should not suddenly get roasted because the skill exists.

## Manual use

Use the root `SKILL.md`, or download `dist/skill-issue.skill` if your harness supports the packaged format.

## Status

v0.1.0 is actively being tested across different models and agent harnesses. Results are wanted, including failures, ignored instructions, over-triggering, and cases where the baseline performs better.
