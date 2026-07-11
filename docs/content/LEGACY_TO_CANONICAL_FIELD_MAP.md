# Legacy To Canonical Field Map

This file documents how the current Google Sheet columns are bridged into the LearnPlay question asset schema.

## Rules

- The 34 legacy columns stay in their current order.
- Optional enrichment columns may be added after the legacy columns.
- Review or Pending rows can be valid/imported but are not publishable.
- Match Pairs imports for preview only until a dedicated renderer is finished.

## Legacy Column Mapping

| Legacy column | Canonical field | Use |
| --- | --- | --- |
| Question ID | Question ID | Required |
| Question Pool Version | Version Notes metadata | Optional/source metadata |
| Status | Status | Publishability |
| Subject | Subject | Required |
| Year | Year | Required |
| World | World | Required |
| Level | Level | Required and source mismatch check |
| Topic | Topic | Required for organization |
| Subtopic | Subtopic | Optional |
| Learning Objective | Learning Objective | Required for teaching note fallback |
| Difficulty | Difficulty | Required |
| Question Type | Question Type | Required |
| Question | Question | Required |
| Visual Object | Visual Object | Required when visuals are needed |
| Visual Description | Visual Description | Required for visual question types |
| Option A-D | Options | Required for Multiple Choice and Tap Correct Group |
| Correct Answer | Correct Answer | Required |
| Step 1-3 | Step 1-3 | Required |
| Final Explanation | Final Explanation | Required |
| LearnBot Tip | LearnBot Tip | Warning if missing |
| Assessment Eligible | Assessment Eligible | Publishability support |
| Curriculum Alignment | Curriculum Alignment | Optional |
| Estimated Time (Seconds) | Estimated Time | Optional |
| Visual Asset Required | Required Assets fallback | Optional/inferred |
| Voice Script | Voice Script | Optional |
| Reviewer | Reviewer metadata | Optional |
| Review Status | Review Status | Publishability |
| Review Date | Review Date metadata | Optional |
| Version Notes | Version Notes | Publishability support |

## Fallbacks

- Teaching Notes are inferred from Learning Objective, Step 1, Step 2, Step 3, and LearnBot Tip when the column is missing.
- Required Assets are inferred from Visual Asset Required, Visual Object, Visual Description, and Question Type.
- Option A-D are combined into the canonical `Options` field using `|`.

## Supported Question Types

- Multiple Choice: needs at least 2 options and the correct answer must match one option.
- Count & Type: does not require options; needs a numeric correct answer.
- Tap Correct Group: uses Option A-D as tap targets.
- Fill Missing Number: does not require options; needs a correct answer.
- True or False: can omit options if correct answer is True or False.
- Match Pairs: imports for preview only and is not publishable yet.