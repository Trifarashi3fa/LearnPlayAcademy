# Curriculum QA Validation Report

Date: 2026-07-17

## Scope

This report covers the new Curriculum QA and Approval System for LearnPlay question assets.

Reviewed current source package:

- English Year 1 Forest World source CSV files
- Location: `content/question-assets/imports/english/year-1/`
- Files: `forest-l01.csv` through `forest-l10.csv`

No English gameplay was activated.
No English questions were imported.
No Mathematics production content was modified.
No active manifest was modified.

## QA System Implemented

Created a standardized QA workflow with statuses:

- Draft
- Review
- Needs Revision
- Approved
- Rejected
- Archived

Created reusable QA checks for:

- Status validation
- Status transition validation
- Duplicate question text
- Duplicate explanations
- Duplicate LearnBot tips
- Repeated distractors
- Curriculum completeness
- Learning objective completeness
- Explanation completeness
- Visual description completeness
- Voice script completeness
- Question-type combination checks

## Developer QA Dashboard

Added developer-only dashboard:

```text
/dev/curriculum-qa
```

The dashboard shows:

- Questions by status
- Questions by level
- Questions by type
- Validation warnings
- Duplicate summary
- Curriculum coverage summary
- Approval readiness
- Educational QA checklist

The route is protected by the same dev-preview feature flag pattern and is not public navigation.

## Current English QA Summary

| Metric | Count |
| --- | ---: |
| Source rows | 300 |
| Review rows | 300 |
| Approved rows | 0 |
| Publishable rows | 0 |
| Structural errors | 0 |
| QA warnings | 407 |
| Duplicate groups | 38 |

## Question Type Distribution

| Question Type | Count |
| --- | ---: |
| Multiple Choice | 64 |
| Match Pairs | 47 |
| Tap Correct | 49 |
| Fill Missing Letter | 20 |
| Fill Missing Word | 37 |
| Text Input | 39 |
| True / False | 44 |

## Level Summary

| Level File | Rows | Errors | Warnings | Duplicate Groups |
| --- | ---: | ---: | ---: | ---: |
| forest-l01.csv | 30 | 0 | 39 | 3 |
| forest-l02.csv | 30 | 0 | 45 | 6 |
| forest-l03.csv | 30 | 0 | 40 | 3 |
| forest-l04.csv | 30 | 0 | 39 | 3 |
| forest-l05.csv | 30 | 0 | 36 | 2 |
| forest-l06.csv | 30 | 0 | 39 | 3 |
| forest-l07.csv | 30 | 0 | 41 | 4 |
| forest-l08.csv | 30 | 0 | 42 | 5 |
| forest-l09.csv | 30 | 0 | 47 | 7 |
| forest-l10.csv | 30 | 0 | 39 | 2 |

## Interpretation

The English source bank is structurally usable for QA review:

- All 300 rows are readable.
- All 300 rows use supported question types.
- No structural errors were found by the QA summary.
- All rows remain Review status.
- No rows are publishable yet.

Warnings are expected because this package is still pre-approval. They identify repeated language, repeated distractors, and fields that require reviewer attention before approval.

## Validation Rules

Warnings:

- Duplicate wording
- Duplicate explanation
- Duplicate LearnBot tip
- Repeated distractors
- Missing optional review metadata
- Unsupported but non-blocking review status values
- Question-type quality concerns

Errors:

- Missing required question identity
- Missing question text
- Missing correct answer
- Missing explanation
- Unsupported question type in an approved/importable row
- Correct answer not matching required option/target format

## Known Limitations

- Duplicate warnings are text-based and may flag intentional practice patterns.
- Repeated distractor warnings can be noisy for beginner English vocabulary.
- The QA dashboard reads local source CSV files and is not a full editorial CMS.
- Cambridge and KSSR alignment require human expert review.
- Warnings are not build-blocking by default.

## Future Enhancements

- Add per-subject warning thresholds.
- Add reviewer sign-off fields to English source template.
- Add downloadable QA reports from the dashboard.
- Add package-level approval lock before manifest generation.
- Add review comments and version history.

## Production Safety Confirmation

- English remains inactive.
- English CSV source files were not imported.
- `generated/active-content-manifest.json` was not changed.
- Mathematics production assets were not edited.
- Supabase was not changed.
- No commit or push was performed.
