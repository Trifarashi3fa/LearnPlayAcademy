# English Level 1 Release Checklist

## Controlled Beta Scope

- [x] English Level 1 only
- [x] 30 source questions reviewed
- [x] Keep English Levels 2-10 inactive
- [x] Keep Mathematics production unchanged
- [x] Keep production manifest unchanged until explicit import/activation

## QA Complete

| Check | Status |
| --- | --- |
| Structural fields complete | Complete |
| KSSR alignment present | Complete |
| Cambridge alignment present | Complete |
| Age-appropriate wording | Complete |
| Correct answers checked | Complete |
| Distractors reviewed | Complete |
| Explanations reviewed | Complete |
| LearnBot tips reviewed | Complete |
| Voice scripts reviewed | Complete |
| Visual descriptions reviewed | Complete |
| Duplicate groups resolved | Complete |

## Approval Counts

- Approved questions: 30
- Remaining Review questions: 0
- Required active gameplay questions later: 10
- Source pool available for staging: 30

## Import Readiness

Prepared staging command:

```powershell
npm.cmd run import:questions -- --file "E:\Codex\learnplay-academy\content\question-assets\imports\english\year-1\forest-l01.csv" --sheet "Forest L01"
```

Do not run this command until the English Level 1 staging import is explicitly approved. Running it would create imported English JSON/report outputs, but should still not change the active production manifest unless a later activation step connects it.

## Gameplay Readiness

- Question engine supports the planned Level 1 types through the current preview/import architecture.
- English gameplay remains disabled until a later activation phase.
- English Levels 2-10 remain Review-only content and inactive.

## LearnBot Readiness

- Level 1 tips are short strategy statements.
- Voice scripts are speakable and child-friendly.
- Visual descriptions identify the intended learning support.

## Parent Dashboard Readiness

- Parent Dashboard should not show English progress until English package activation is implemented.
- Progress isolation by subject/year/world must be preserved before any beta session saves English progress.

## Rollback Steps

Before destructive rollback, copy the current file to a backup location.

```powershell
Copy-Item -LiteralPath "E:\Codex\learnplay-academy\content\question-assets\imports\english\year-1\forest-l01.csv" -Destination "E:\Codex\learnplay-academy\content\question-assets\imports\english\year-1\forest-l01.approved-backup.csv"
```

To revert the approval package manually, change Level 1 `Status` values from `Approved` back to `Review` and rerun the content quality review script.

## Known Risks

- English gameplay activation is not part of this phase.
- Levels 2-10 still need quality optimization before release.
- Human educator review is still recommended before public beta.
- Staging import should be reviewed in dev preview before production routing changes.

## Success Metrics for Beta

- Children complete 10-question Level 1 sessions without help from a parent.
- At least 80% of answered questions have correct responses by the second attempt.
- Parent testers understand that English is a controlled Level 1 beta.
- No Mathematics progress/content regression is observed.
- No duplicate or confusing Level 1 prompt is reported during playtest.
