# Testing Skill Issue

The purpose of this test is to measure whether Skill Issue changes **problem-solving behavior**, not only writing style.

## Best test method

For each scenario, keep these variables the same whenever possible:

- model
- agent/harness
- system/project context
- repository state
- user prompt

Change only whether Skill Issue is loaded.

## Run two passes

### Pass A — Baseline

Run the scenario without Skill Issue.

Save the complete response.

### Pass B — Skill Issue

Start from equivalent context, enable Skill Issue, and run the same scenario.

Save the complete response.

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

## Test report

Open a GitHub issue using the **Skill test report** template. Raw outputs are welcome; redact secrets, private repository details, tokens, credentials, or personal information first.
