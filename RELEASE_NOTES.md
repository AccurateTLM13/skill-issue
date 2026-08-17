# v0.1.0 — Public Test

This is the first public test release of **Skill Issue**.

Skill Issue is a behavioral coding skill designed to push AI coding agents toward smaller fixes, less unnecessary architecture, fewer repeated explanations, and more practical follow-through — while preserving correctness and useful help.

## Included

- packaged `skill-issue.skill`
- source `SKILL.md`
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

## Download

Use `dist/skill-issue.skill`, or load `skill-issue/SKILL.md` directly if your harness supports Markdown skills.

## Status

Experimental. Results across different models and agent harnesses are specifically wanted, including failures, ignored instructions, over-triggering, and cases where the baseline performs better.
