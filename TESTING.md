# Testing Skill Issue

The purpose of this test is to measure whether Skill Issue changes **problem-solving behavior**, not only writing style.

The canonical benchmark lives in [`benchmark/`](benchmark/README.md).

## Two kinds of tests

### Executable cases

The agent receives a real tiny project and must modify files so the case verifier passes.

Correctness comes first. A shorter solution that fails verification is still a failed run.

### Behavioral cases

Some behaviors are better tested conversationally: restraint with beginners, repetition handling, false-positive avoidance, and safety guardrails.

These cases use fixed prompts and scoring criteria instead of code verifiers.

## Controlled A/B method

For each case, keep these variables identical whenever possible:

- exact model/version
- agent/harness
- system/project context
- starting repository state
- settings/tool access
- task/prompt

Change only whether Skill Issue is available.

For executable cases, always create **two fresh working copies** from the untouched fixture. Never let the baseline agent see the root `SKILL.md` or a prior Skill Issue transcript.

## Executable workflow

Example using S03:

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell baseline
```

Run the baseline agent against the created directory and give it `TASK.md` verbatim.

Then:

```bash
node benchmark/scripts/verify-run.mjs s03-dependency-hell baseline
node benchmark/scripts/measure-run.mjs s03-dependency-hell baseline
```

Create a completely fresh Skill Issue run:

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell skill-issue
```

Enable Skill Issue, use the same model/harness/settings and the exact same task, then verify and measure that run too.

## Functional gate

For executable cases, record verifier status first:

- **PASS** — functional contract satisfied
- **FAIL** — functional contract not satisfied

Do not award a simplicity win to a failed run.

## Judgment signals

The measurement script reports objective scope signals where possible:

- files changed
- files added
- files removed
- total line count before/after
- net line change
- dependencies present
- introduced build/config files

These signals do not automatically determine a winner. A larger change can be justified. They make the tradeoff visible so reviewers can judge it instead of relying on vibes.

## Score both answers

Use a 1–5 score for each dimension.

| Dimension | 1 | 5 |
|---|---|---|
| Correctness | Wrong / unusable | Correct and usable |
| Directness | Buried fix | Fix is immediately clear |
| Simplicity | Over-engineered | Smallest reasonable solution |
| Scope control | Expands the problem | Keeps work tightly scoped |
| Explanation | Too little or lecture-mode | Enough context, no bloat |
| Tone | Harmful / distracting | Adds character without hurting help |
| Follow-through | Leaves user guessing | Clear next action |

For executable cases, a verifier failure caps the run as unsuccessful regardless of subjective scores.

## Trigger accuracy

Also record whether Skill Issue activated appropriately.

Choose one:

- **Correct trigger** — attitude matched the situation.
- **Should have stayed mild** — skill was useful but too strong.
- **False positive** — calm/competent request got unnecessary attitude.
- **Missed trigger** — obvious repeated/flailing situation received generic support-agent prose.

## Important failure modes

Please report these even when the technical answer is correct:

- roasting the person instead of the situation
- excessive catchphrases
- hostility escalation
- sacrificing a necessary step for brevity
- refusing to explain when explanation is actually required
- forcing a "did you scroll up" response when the previous answer was unclear
- over-triggering on respectful beginners
- using snark as a substitute for solving the problem
- passing by deleting or bypassing the intended behavior instead of solving it
- introducing unnecessary architecture despite a smaller valid solution

## Test report

Open a GitHub issue using the **Skill test report** template. Include raw outputs plus verifier/measurement results when applicable.

Redact secrets, private repository details, tokens, credentials, or personal information first.
