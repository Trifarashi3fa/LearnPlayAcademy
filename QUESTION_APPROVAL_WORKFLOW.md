# LearnPlay Question Approval Workflow

## Workflow Overview

Questions move through this status flow:

```text
Draft -> Review -> Approved
Draft -> Review -> Needs Revision -> Review -> Approved
Draft -> Review -> Rejected -> Archived
Approved -> Needs Revision -> Review -> Approved
Approved -> Archived
Rejected -> Draft
Archived -> Draft
```

## Allowed Status Transitions

| From | Allowed Next Status |
| --- | --- |
| Draft | Review, Archived |
| Review | Needs Revision, Approved, Rejected, Archived |
| Needs Revision | Review, Rejected, Archived |
| Approved | Needs Revision, Archived |
| Rejected | Draft, Archived |
| Archived | Draft |

## Author Workflow

1. Create or edit a question as Draft.
2. Complete all required fields.
3. Check the question type is supported.
4. Add explanation, LearnBot tip, voice script, and visual description.
5. Set Status to Review.
6. Wait for reviewer feedback.

## Reviewer Workflow

1. Open the question asset file or QA dashboard.
2. Check automated warnings and duplicate summaries.
3. Review educational quality using the QA checklist.
4. If changes are needed, set Status to Needs Revision and add QA notes.
5. If the question should not be used, set Status to Rejected.
6. If the question passes all checks, set Status to Approved.

## Approval Rules

A question is not production-ready merely because it is structurally valid.

For release readiness:

- Status must be Approved.
- Review Status must be Approved where present.
- No blocking validation errors should exist.
- Warnings must be reviewed and accepted or resolved.
- QA Notes must not contain unresolved reviewer concerns.
- The content must not use unsupported future question types.

## Import Safety

The current import pipeline imports only rows with Status = Approved.

Rows with these statuses are skipped before production schema validation:

- Draft
- Review
- Needs Revision
- Rejected
- Archived
- Future
- Backlog

This keeps future content in source files without blocking MVP imports.

## Reviewer Sign-Off Recommendation

Before activation, record:

- Reviewer name
- Review date
- Approved package version
- Known accepted warnings
- Subject/year/world/level coverage confirmation

## Current English Status

English Year 1 Forest World source questions are in Review status. They are valid for QA and developer preview, but they are not publishable and are not active in gameplay.

## Future Enhancements

- Multi-reviewer approval.
- Approval history table.
- Change-request comments.
- Exportable sign-off PDF.
- Content freeze and release-candidate lock.
