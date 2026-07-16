# RC1 Commit Sequence

Project: `E:\Codex\learnplay-academy`

Purpose: prepare a clean `v1.0-beta-rc1` checkpoint using four commits only.

Important:

- This file is a plan only.
- No git commands were executed while generating this file.
- No tests or build were run while generating this file.
- No application code, curriculum, documentation, assets, generated files, or `package.json` were modified except creating this requested planning file.
- Before using these commands, first resolve the mixed staged state described in `GIT_RC1_CLEANUP_PLAN.md`.

## Required First Step Before Commit Sequence

The current repository has a mixed staged state. Some files have staged changes plus newer unstaged changes. Do not commit the current index as-is.

Run this manually before using the four commit commands:

```powershell
Set-Location E:\Codex\learnplay-academy

# Review first. This is safe and read-only.
git status --short

# Unstage everything without changing working-tree files.
git reset

# Confirm there are no mixed staged entries left.
git status --short
```

Rollback note:

- `git reset` without `--hard` only unstages files. It does not delete working-tree changes.
- If you want an index backup first, follow the backup commands in `GIT_RC1_CLEANUP_PLAN.md`.

## Commit 1: Question Engine + Import Pipeline

### Intent

Group all question-engine preview, importer, question asset, random-pool, generated import report, and importer test work together.

### Files Included

```text
app/dev/question-engine-preview/page.tsx
components/mvp/question-engine/PilotQuestionEnginePreview.tsx
components/mvp/question-engine/QuestionRenderer.tsx
components/mvp/question-engine/renderers/MatchPairsRenderer.tsx
content/question-assets/imports/mathematics/year-1/forest-l01.csv
content/question-assets/imports/mathematics/year-1/forest-l02.csv
content/question-assets/imports/mathematics/year-1/forest-l03.csv
content/question-assets/imports/mathematics/year-1/forest-l04.csv
content/question-assets/imports/mathematics/year-1/forest-l05.csv
content/question-assets/imports/mathematics/year-1/forest-l06.csv
content/question-assets/imports/mathematics/year-1/forest-l07.csv
content/question-assets/imports/mathematics/year-1/forest-l08.csv
content/question-assets/imports/mathematics/year-1/forest-l09.csv
content/question-assets/imports/mathematics/year-1/forest-l10.csv
content/question-assets/mathematics/year-1/forest-world/forest-l01-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l02-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l03-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l04-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l05-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l06-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l07-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l08-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l09-imported.json
content/question-assets/mathematics/year-1/forest-world/forest-l10-imported.json
data/question-engine-types.ts
generated/question-assets/year-1-forest-batch-import-report.json
generated/question-assets/year-1-forest-l01-import-report.json
generated/question-assets/year-1-forest-l02-import-report.json
generated/question-assets/year-1-forest-l03-import-report.json
generated/question-assets/year-1-forest-l04-import-report.json
generated/question-assets/year-1-forest-l05-import-report.json
generated/question-assets/year-1-forest-l06-import-report.json
generated/question-assets/year-1-forest-l07-import-report.json
generated/question-assets/year-1-forest-l08-import-report.json
generated/question-assets/year-1-forest-l09-import-report.json
generated/question-assets/year-1-forest-l10-import-report.json
lib/question-assets/import-question-assets.ts
lib/question-assets/random-question-pool.ts
lib/question-assets/validate-question-assets.ts
lib/question-engine/grade-response.ts
lib/question-engine/match-pairs.ts
lib/question-engine/serialize-response.ts
scripts/import-question-assets.mjs
scripts/import-year1-forest-question-assets.mjs
scripts/test-question-asset-import.mjs
package.json
```

### Files Excluded

```text
generated/question-assets/year-1-forest-batch-import-report-readable.json
generated/question-assets/year-1-forest-report-readable.json
app/account/**
app/mvp/**
components/account/**
components/mvp/LockedLevelNotice.tsx
components/mvp/LevelIntroClient.tsx
components/mvp/MathematicsMvpPage.tsx
components/mvp/MvpShell.tsx
components/mvp/ParentDashboardClient.tsx
components/mvp/QuestionPlayer.tsx
components/mvp/RewardsClient.tsx
components/mvp/WorldMapClient.tsx
components/mvp/explanation/**
components/mvp/learning-session/**
components/mvp/useMvpProgress.ts
lib/progress/**
public/**/*.webp
root-level report markdown files
next-env.d.ts
```

### Exact PowerShell Commands

```powershell
Set-Location E:\Codex\learnplay-academy

git add -- `
  app/dev/question-engine-preview/page.tsx `
  components/mvp/question-engine/PilotQuestionEnginePreview.tsx `
  components/mvp/question-engine/QuestionRenderer.tsx `
  components/mvp/question-engine/renderers/MatchPairsRenderer.tsx `
  content/question-assets/imports/mathematics/year-1/forest-l01.csv `
  content/question-assets/imports/mathematics/year-1/forest-l02.csv `
  content/question-assets/imports/mathematics/year-1/forest-l03.csv `
  content/question-assets/imports/mathematics/year-1/forest-l04.csv `
  content/question-assets/imports/mathematics/year-1/forest-l05.csv `
  content/question-assets/imports/mathematics/year-1/forest-l06.csv `
  content/question-assets/imports/mathematics/year-1/forest-l07.csv `
  content/question-assets/imports/mathematics/year-1/forest-l08.csv `
  content/question-assets/imports/mathematics/year-1/forest-l09.csv `
  content/question-assets/imports/mathematics/year-1/forest-l10.csv `
  content/question-assets/mathematics/year-1/forest-world/forest-l01-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l02-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l03-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l04-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l05-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l06-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l07-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l08-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l09-imported.json `
  content/question-assets/mathematics/year-1/forest-world/forest-l10-imported.json `
  data/question-engine-types.ts `
  generated/question-assets/year-1-forest-batch-import-report.json `
  generated/question-assets/year-1-forest-l01-import-report.json `
  generated/question-assets/year-1-forest-l02-import-report.json `
  generated/question-assets/year-1-forest-l03-import-report.json `
  generated/question-assets/year-1-forest-l04-import-report.json `
  generated/question-assets/year-1-forest-l05-import-report.json `
  generated/question-assets/year-1-forest-l06-import-report.json `
  generated/question-assets/year-1-forest-l07-import-report.json `
  generated/question-assets/year-1-forest-l08-import-report.json `
  generated/question-assets/year-1-forest-l09-import-report.json `
  generated/question-assets/year-1-forest-l10-import-report.json `
  lib/question-assets/import-question-assets.ts `
  lib/question-assets/random-question-pool.ts `
  lib/question-assets/validate-question-assets.ts `
  lib/question-engine/grade-response.ts `
  lib/question-engine/match-pairs.ts `
  lib/question-engine/serialize-response.ts `
  scripts/import-question-assets.mjs `
  scripts/import-year1-forest-question-assets.mjs `
  scripts/test-question-asset-import.mjs `
  package.json

git commit -m "Add question engine import pipeline"
```

Note:

- `package.json` is included here because it contains importer/test script wiring. If you want MVP test script changes in Commit 2 instead, use interactive staging for `package.json`; otherwise keep the whole file in Commit 1.

## Commit 2: MVP Improvements

### Intent

Group beta-facing product improvements: account safety, Year 1 availability, profile/privacy wording, parent dashboard clarity, progression guard, reset safety, lesson/reward polish, and MVP-specific tests.

### Files Included

```text
app/account/actions.ts
app/account/page.tsx
app/mvp/parent-dashboard/page.tsx
app/mvp/rewards/page.tsx
app/mvp/world-map/page.tsx
app/page.tsx
app/privacy/page.tsx
app/terms/page.tsx
components/account/ChildProfileManager.tsx
components/account/ChildProfileSetupForm.tsx
components/account/ParentAuthForm.tsx
components/mvp/LevelIntroClient.tsx
components/mvp/LockedLevelNotice.tsx
components/mvp/MathematicsMvpPage.tsx
components/mvp/MvpShell.tsx
components/mvp/ParentDashboardClient.tsx
components/mvp/QuestionPlayer.tsx
components/mvp/RewardsClient.tsx
components/mvp/WorldMapClient.tsx
components/mvp/explanation/ForestRewardScreen.tsx
components/mvp/explanation/HintPanel.tsx
components/mvp/explanation/QuestionCard.tsx
components/mvp/explanation/XPRewardCard.tsx
components/mvp/explanation/learnbot-teaching.ts
components/mvp/learning-session/LearningSessionShell.tsx
components/mvp/useMvpProgress.ts
data/account-types.ts
lib/progress/child-progress.ts
lib/progress/level-access.ts
lib/progress/local-progress.ts
lib/progress/reset-progress-safety.ts
scripts/test-mvp-level-access.mjs
scripts/test-mvp-reset-safety.mjs
scripts/test-mvp-year-availability.mjs
```

### Files Excluded

```text
question asset import CSV/JSON/report files
lib/question-assets/**
lib/question-engine/**
components/mvp/question-engine/**
scripts/import-question-assets.mjs
scripts/import-year1-forest-question-assets.mjs
scripts/test-question-asset-import.mjs
package.json if already committed in Commit 1
public/**/*.webp
documentation reports
next-env.d.ts
```

### Exact PowerShell Commands

```powershell
Set-Location E:\Codex\learnplay-academy

git add -- `
  app/account/actions.ts `
  app/account/page.tsx `
  app/mvp/parent-dashboard/page.tsx `
  app/mvp/rewards/page.tsx `
  app/mvp/world-map/page.tsx `
  app/page.tsx `
  app/privacy/page.tsx `
  app/terms/page.tsx `
  components/account/ChildProfileManager.tsx `
  components/account/ChildProfileSetupForm.tsx `
  components/account/ParentAuthForm.tsx `
  components/mvp/LevelIntroClient.tsx `
  components/mvp/LockedLevelNotice.tsx `
  components/mvp/MathematicsMvpPage.tsx `
  components/mvp/MvpShell.tsx `
  components/mvp/ParentDashboardClient.tsx `
  components/mvp/QuestionPlayer.tsx `
  components/mvp/RewardsClient.tsx `
  components/mvp/WorldMapClient.tsx `
  components/mvp/explanation/ForestRewardScreen.tsx `
  components/mvp/explanation/HintPanel.tsx `
  components/mvp/explanation/QuestionCard.tsx `
  components/mvp/explanation/XPRewardCard.tsx `
  components/mvp/explanation/learnbot-teaching.ts `
  components/mvp/learning-session/LearningSessionShell.tsx `
  components/mvp/useMvpProgress.ts `
  data/account-types.ts `
  lib/progress/child-progress.ts `
  lib/progress/level-access.ts `
  lib/progress/local-progress.ts `
  lib/progress/reset-progress-safety.ts `
  scripts/test-mvp-level-access.mjs `
  scripts/test-mvp-reset-safety.mjs `
  scripts/test-mvp-year-availability.mjs

git commit -m "Improve MVP beta safety and learning flow"
```

## Commit 3: Production Assets

### Intent

Group optimized WebP delivery assets and the production code references that use them.

### Files Included

```text
app/games/science-explorer/page.tsx
components/Navbar.tsx
components/games/DemoMathGame.tsx
components/mathematics/PremiumMathematicsExperience.tsx
data/feature-flags.ts
data/mathematics-premium.ts
public/assets/math-icons/box.webp
public/assets/math-icons/coin.webp
public/assets/math-icons/gem.webp
public/assets/math-icons/pencil.webp
public/assets/math-icons/splash.webp
public/assets/math-icons/star.webp
public/assets/math-premium/dashboard-hero.webp
public/assets/math-premium/learnbot-helper.webp
public/assets/math-premium/world-forest.webp
public/assets/math-premium/world-galaxy.webp
public/assets/math-premium/world-mountain.webp
public/assets/math-premium/world-ocean.webp
public/assets/math-premium/world-space.webp
public/learnplay-academy-logo.webp
public/mascots/explorer-boy-front.webp
public/mascots/learnbot-celebrate.webp
public/mascots/learnbot-explaining.webp
public/mascots/learnbot-front.webp
public/mascots/learnbot-happy.webp
public/mascots/learnbot-thinking.webp
public/mascots/learnbot-trophy.webp
public/rewards/badge.webp
public/rewards/certificate.webp
public/rewards/star.webp
public/subjects/bahasa-melayu.webp
public/subjects/english.webp
public/subjects/general-knowledge.webp
public/subjects/life-skills.webp
public/subjects/math.webp
public/subjects/science.webp
public/worlds/level 1-forest-world.webp
```

### Files Excluded

```text
original large PNG source/fallback assets
public/design-system/*.png
question engine/import files
MVP account/progress files
documentation reports
generated question-asset reports
```

### Exact PowerShell Commands

```powershell
Set-Location E:\Codex\learnplay-academy

git add -- `
  app/games/science-explorer/page.tsx `
  components/Navbar.tsx `
  components/games/DemoMathGame.tsx `
  components/mathematics/PremiumMathematicsExperience.tsx `
  data/feature-flags.ts `
  data/mathematics-premium.ts `
  public/assets/math-icons/box.webp `
  public/assets/math-icons/coin.webp `
  public/assets/math-icons/gem.webp `
  public/assets/math-icons/pencil.webp `
  public/assets/math-icons/splash.webp `
  public/assets/math-icons/star.webp `
  public/assets/math-premium/dashboard-hero.webp `
  public/assets/math-premium/learnbot-helper.webp `
  public/assets/math-premium/world-forest.webp `
  public/assets/math-premium/world-galaxy.webp `
  public/assets/math-premium/world-mountain.webp `
  public/assets/math-premium/world-ocean.webp `
  public/assets/math-premium/world-space.webp `
  public/learnplay-academy-logo.webp `
  public/mascots/explorer-boy-front.webp `
  public/mascots/learnbot-celebrate.webp `
  public/mascots/learnbot-explaining.webp `
  public/mascots/learnbot-front.webp `
  public/mascots/learnbot-happy.webp `
  public/mascots/learnbot-thinking.webp `
  public/mascots/learnbot-trophy.webp `
  public/rewards/badge.webp `
  public/rewards/certificate.webp `
  public/rewards/star.webp `
  public/subjects/bahasa-melayu.webp `
  public/subjects/english.webp `
  public/subjects/general-knowledge.webp `
  public/subjects/life-skills.webp `
  public/subjects/math.webp `
  public/subjects/science.webp `
  "public/worlds/level 1-forest-world.webp"

git commit -m "Optimize production image delivery assets"
```

## Commit 4: Documentation

### Intent

Group release, QA, standards, planning, legal/content workflow, and asset documentation.

### Files Included

Current root-level files:

```text
ASSET_IMPLEMENTATION_REPORT.md
BETA_READINESS_SCORE.md
CONTENT_APPROVAL_CHECKLIST.md
CONTENT_FACTORY_STANDARD.md
CONTENT_VERSIONING_GUIDE.md
FOREST_WORLD_CONTENT_IMPROVEMENT_REPORT.md
FOREST_WORLD_V1_RELEASE_REPORT.md
GIT_RC1_CLEANUP_PLAN.md
IMAGE_OPTIMIZATION_REPORT.md
MVP_RELEASE_CANDIDATE_REPORT.md
MVP_RELEASE_CHECKLIST.md
PARENT_DASHBOARD_IMPROVEMENT_PLAN.md
PRODUCTION_ASSET_CHECKLIST.md
QUESTION_AUTHOR_GUIDE.md
QUESTION_REVIEW_GUIDE.md
RC1_COMMIT_SEQUENCE.md
```

Existing docs files:

```text
docs/content/QUESTION_ASSET_IMPORT_WORKFLOW.md
docs/content/LEGACY_TO_CANONICAL_FIELD_MAP.md
docs/content/templates/QUESTION_ASSET_MASTER_TEMPLATE.csv
```

Recommended target structure if you decide to move documentation before this commit:

```text
docs/project/release/
docs/project/qa/
docs/project/standards/
docs/project/planning/
docs/project/assets/
docs/project/legal/
```

### Files Excluded

```text
application code
question asset CSV/JSON/generated reports
optimized WebP assets
original large PNG assets
temporary readable generated reports
next-env.d.ts unless deliberately reviewed
```

### Exact PowerShell Commands

Use this version if documentation stays in the repository root:

```powershell
Set-Location E:\Codex\learnplay-academy

git add -- `
  ASSET_IMPLEMENTATION_REPORT.md `
  BETA_READINESS_SCORE.md `
  CONTENT_APPROVAL_CHECKLIST.md `
  CONTENT_FACTORY_STANDARD.md `
  CONTENT_VERSIONING_GUIDE.md `
  FOREST_WORLD_CONTENT_IMPROVEMENT_REPORT.md `
  FOREST_WORLD_V1_RELEASE_REPORT.md `
  GIT_RC1_CLEANUP_PLAN.md `
  IMAGE_OPTIMIZATION_REPORT.md `
  MVP_RELEASE_CANDIDATE_REPORT.md `
  MVP_RELEASE_CHECKLIST.md `
  PARENT_DASHBOARD_IMPROVEMENT_PLAN.md `
  PRODUCTION_ASSET_CHECKLIST.md `
  QUESTION_AUTHOR_GUIDE.md `
  QUESTION_REVIEW_GUIDE.md `
  RC1_COMMIT_SEQUENCE.md `
  docs/content/QUESTION_ASSET_IMPORT_WORKFLOW.md `
  docs/content/LEGACY_TO_CANONICAL_FIELD_MAP.md `
  docs/content/templates/QUESTION_ASSET_MASTER_TEMPLATE.csv

git commit -m "Add RC1 release documentation"
```

Use this version if documentation is moved under `docs/project/` first:

```powershell
Set-Location E:\Codex\learnplay-academy

git add -- `
  docs/content/QUESTION_ASSET_IMPORT_WORKFLOW.md `
  docs/content/LEGACY_TO_CANONICAL_FIELD_MAP.md `
  docs/content/templates/QUESTION_ASSET_MASTER_TEMPLATE.csv `
  docs/project

git commit -m "Add RC1 release documentation"
```

## Files To Keep Out Of All Four Commits Unless Reviewed

```text
generated/question-assets/year-1-forest-batch-import-report-readable.json
generated/question-assets/year-1-forest-report-readable.json
next-env.d.ts
original large PNG source/fallback files
.next/
.npm-cache/
.env.local
work/rc1-backups/
```

## Final Review Commands To Run Manually

These are listed for later manual use only. They were not executed while generating this plan.

```powershell
Set-Location E:\Codex\learnplay-academy
git status --short
git log --oneline -4
```

Recommended validation after the four commits are created:

```powershell
npm.cmd run test:question-assets
npm.cmd run test:mvp-level-access
npm.cmd run test:mvp-reset-safety
npm.cmd run test:mvp-year-availability
npm.cmd run validate:curriculum
npm.cmd run lint
npx.cmd tsc --noEmit --incremental false
npm.cmd run build
```
