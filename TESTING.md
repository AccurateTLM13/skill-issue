# Testing Skill Issue

The goal is to measure whether Skill Issue changes **problem-solving behavior**, not only writing style.

The canonical benchmark lives in [`benchmark/`](benchmark/README.md).

## Test types

### Executable cases

The agent receives a real tiny project and must make the verifier pass. Correctness comes first; a shorter failed solution is still a failed run.

### Behavioral cases

These test restraint with beginners, repetition handling, false-positive avoidance, tone, and safety guardrails using fixed prompts and scoring criteria.

## Controlled A/B method

Keep these identical whenever possible:

- exact model/version
- agent/harness
- system context
- starting fixture
- settings/tool access
- task/prompt

Change only whether Skill Issue is available.

For executable cases, `create-run.mjs` creates fresh working copies in a sibling `skill-issue-runs/` directory outside this repo. Point the agent at the printed run path so the baseline cannot accidentally discover the root `SKILL.md`.

Example:

```bash
node benchmark/scripts/create-run.mjs s03-dependency-hell baseline
node benchmark/scripts/verify-run.mjs s03-dependency-hell baseline
node benchmark/scripts/measure-run.mjs s03-dependency-hell baseline

node benchmark/scripts/create-run.mjs s03-dependency-hell skill-issue
node benchmark/scripts/verify-run.mjs s03-dependency-hell skill-issue
node benchmark/scripts/measure-run.mjs s03-dependency-hell skill-issue
```

Use the copied `TASK.md` verbatim for both runs and save both transcripts.

## Functional gate

For executable cases, record verifier status first:

- **PASS** — functional contract satisfied
- **FAIL** — functional contract not satisfied

A verifier failure makes the run unsuccessful regardless of subjective scores.

## Judgment signals

The measurement script reports:

- files changed/added/removed
- total line count before/after
- `netLineCountChange`
- dependency count before/after
- `dependenciesAdded`
- introduced build/config files

These signals make scope visible; they do not automatically determine a winner.

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

## Trigger accuracy

Choose one:

- **Correct trigger** — attitude matched the situation.
- **Should have stayed mild** — useful, but too strong.
- **False positive** — calm/competent request got unnecessary attitude.
- **Missed trigger** — obvious repeated/flailing situation received generic prose.

## Failure modes worth reporting

- roasting the person instead of the situation
- hostility escalation or excessive catchphrases
- sacrificing a necessary step for brevity
- refusing to explain when explanation is required
- forcing the repeated-question bit when the earlier answer was unclear
- over-triggering on respectful beginners
- using snark as a substitute for solving the problem
- passing by bypassing the intended behavior instead of solving it
- introducing unnecessary architecture despite a smaller valid solution

## Test report

Open a GitHub issue using the **Skill test report** template. Include raw outputs plus verifier and measurement results when applicable. Redact secrets, private code, credentials, and personal information first.
