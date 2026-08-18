# Skill Issue

> Your coding agent has patience. This skill doesn't.

**Skill Issue** is a blunt, no-nonsense coding skill that pushes AI coding agents toward smaller fixes, less unnecessary architecture, fewer repeated explanations, and more practical follow-through.

The attitude is optional. The competence is not.

> **Simple > clever. Boring > novel. Working > impressive.**

## Install

Install with the open `skills` CLI:

```bash
npx skills add AccurateTLM13/skill-issue
```

### Install globally

Make Skill Issue available across projects:

```bash
npx skills add AccurateTLM13/skill-issue -g
```

### Try it without installing

```bash
npx skills use AccurateTLM13/skill-issue --skill skill-issue
```

### Verify discovery

See what the CLI finds before installing:

```bash
npx skills add AccurateTLM13/skill-issue --list
```

### Manual install

If your agent harness loads Agent Skills directly, use [`SKILL.md`](SKILL.md).

A packaged [`skill-issue.skill`](dist/skill-issue.skill?raw=1) is also available for compatible harnesses.

## Actively tested across models

Skill Issue v0.1.0 is being tested across coding assistants, models, and agent harnesses to see whether a small behavioral skill can change engineering judgment without making the answer worse.

Want to help? Run the same task with and without the skill, then report what changed.

- [Run the benchmark](benchmark/README.md)
- [See the standard test cases](TEST_CASES.md)
- [Use the testing protocol](TESTING.md)
- [Report results with the Skill test report issue template](../../issues/new/choose)
- [Contribute tests, docs, or skill improvements](CONTRIBUTING.md)

## Benchmark

Skill Issue includes a real A/B benchmark, not just hypothetical prompts.

Executable cases give the agent a tiny project, require it to modify real files, and then run an objective verifier. Behavioral cases test restraint, repetition handling, tone, and safety when code execution is not the point.

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell baseline
# run your coding agent against the created working directory
node benchmark/scripts/verify-run.mjs s03-dependency-hell baseline
node benchmark/scripts/measure-run.mjs s03-dependency-hell baseline
```

Repeat from a **fresh fixture** with Skill Issue enabled. Only compare simplicity and scope after both runs satisfy the functional requirement.

The measurement script reports signals such as files changed, files added, net line change, dependencies present, and build/config files introduced.

[Read the benchmark methodology →](benchmark/README.md)

## What it changes

Skill Issue biases an agent toward:

- the smallest real fix instead of the cleverest architecture
- working code before theory
- cutting scope creep and unnecessary dependencies
- recognizing when a question was already answered
- asking fewer blocking questions
- explaining the actual failure without turning every bug into a lecture
- light roasting of the *situation*, never the person

## Repository contents

```text
skill-issue/
├── SKILL.md              # Agent Skills entrypoint
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── RELEASE_NOTES.md
├── TESTING.md
├── TEST_CASES.md
├── benchmark/
│   ├── README.md
│   ├── scripts/
│   │   ├── create-run.mjs
│   │   ├── verify-run.mjs
│   │   └── measure-run.mjs
│   └── cases/
│       └── ...
├── dist/
│   └── skill-issue.skill
└── .github/
    └── ISSUE_TEMPLATE/
        └── test-report.yml
```

## Agent Skills format

The canonical source is [`SKILL.md`](SKILL.md), using the open Agent Skills format with:

- `name: skill-issue`
- activation-focused `description`
- `license: MIT`
- author and version metadata

The repository is intentionally structured as one skill with `SKILL.md` at the root so skill installers can discover it without custom setup.

## The experiment

Don't only ask whether the tone is entertaining.

For executable cases, run the same real coding task twice:

1. **Baseline** — identical fixture, normal coding agent, no Skill Issue available.
2. **Skill Issue** — fresh identical fixture, same model/harness/settings, Skill Issue enabled.

Correctness is the gate. If a run does not pass its verifier, it cannot win because it changed fewer lines.

After both runs work, compare:

- Did it find a smaller fix?
- Did it avoid needless architecture or dependencies?
- How many files and lines changed?
- Did it introduce a build system or configuration files?
- Did it reduce lecture-mode?
- Was the tone useful without becoming hostile?

Behavioral cases remain conversational when the behavior itself is the thing under test.

Start with [the benchmark](benchmark/README.md) and use [TESTING.md](TESTING.md) for the scoring method.

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
- verifier result when applicable
- measurement output when applicable
- whether the problem was actually solved
- what got better or worse

Messy results are useful. If a model completely ignores the skill, overdoes the attitude, or somehow invents Kubernetes to change a CSS class, report that too.

## Contributing

Test results belong in the [Skill test report](../../issues/new/choose). Changes to the skill, benchmark cases, or documentation are welcome through pull requests; see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT licensed. See [LICENSE](LICENSE).

## Status

**v0.1.0 is actively being tested across models and agent harnesses.** The goal is to learn where the behavioral rules transfer cleanly, where they get ignored, and where they need refinement.
