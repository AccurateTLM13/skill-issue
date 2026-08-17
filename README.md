# Skill Issue

> A blunt, no-nonsense coding skill for when the shortest path to "working" is getting buried under unnecessary complexity.

**Skill Issue** gives an AI coding assistant the energy of a senior developer who has seen this exact mistake before, but still intends to fix it.

The attitude is optional. The competence is not.

## v0.1.0 — Public Test

Skill Issue is now open for cross-model testing.

**[Download `skill-issue.skill`](dist/skill-issue.skill?raw=1)**

Or load [`skill-issue/SKILL.md`](skill-issue/SKILL.md) directly if your agent harness uses Markdown skills.

The useful question is not whether the agent gets funnier. It is whether the skill changes its engineering judgment without making the answer worse.

Run the same prompt with and without the skill, then report what changed.

- [Run the standard test cases](TEST_CASES.md)
- [Use the testing protocol](TESTING.md)
- [Report results with the Skill test report issue template](../../issues/new/choose)

## What it changes

Skill Issue biases an agent toward:

- the smallest real fix instead of the cleverest architecture
- working code before theory
- cutting scope creep and unnecessary dependencies
- recognizing when a question was already answered
- asking fewer blocking questions
- explaining the actual failure without turning every bug into a lecture
- light roasting of the *situation*, never the person

Its core rule:

> **Simple > clever. Boring > novel. Working > impressive.**

## Repository contents

```text
skill-issue/
├── README.md
├── RELEASE_NOTES.md
├── TESTING.md
├── TEST_CASES.md
├── skill-issue/
│   └── SKILL.md
├── dist/
│   └── skill-issue.skill
└── .github/
    └── ISSUE_TEMPLATE/
        └── test-report.yml
```

## Try it

There are two ways to test it depending on your agent harness:

1. Use the packaged [`dist/skill-issue.skill`](dist/skill-issue.skill?raw=1) if your harness accepts this skill package format.
2. Load [`skill-issue/SKILL.md`](skill-issue/SKILL.md) directly if your agent system loads Markdown skills.

Because agent harnesses differ, include the harness and model you used when reporting results.

## The experiment

Don't only ask whether the tone is entertaining.

Run the same technical problem twice:

1. **Baseline** — your normal coding agent without Skill Issue.
2. **Skill Issue** — same model, same prompt, same context, with Skill Issue enabled.

Then compare:

- Did it find a smaller fix?
- Did it avoid needless architecture or dependencies?
- Did it reduce lecture-mode?
- Did it correctly notice repeated questions?
- Was the tone useful without becoming hostile?
- Most importantly: **did the answer still solve the problem?**

Start with the scenarios in [TEST_CASES.md](TEST_CASES.md) and use [TESTING.md](TESTING.md) for the scoring method.

## What this is not

Skill Issue is not permission for an agent to be cruel, dismissive, or less helpful.

The skill explicitly requires correctness and useful help to outrank the bit. If the joke makes the answer worse, the joke loses.

## Report a test

Use the **Skill test report** issue template and include:

- agent/harness
- model
- scenario
- baseline result
- Skill Issue result
- whether the problem was actually solved
- what got better or worse

Messy results are useful. If a model completely ignores the skill, overdoes the attitude, or somehow invents Kubernetes to change a CSS class, report that too.

## Status

**Experimental — v0.1.0 public test.** The goal is to learn how consistently the behavioral rules transfer across models and agent harnesses.
