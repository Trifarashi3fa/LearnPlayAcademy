# Analytics Data Model

## Current Model

The current analytics dashboard uses mock records shaped around future provider integrations. The data model is intentionally separated from UI components so real providers can replace the mock service later.

## Core Entities

### AdminAnalyticsDashboardData

Top-level response returned by the analytics service.

Fields:

- `generatedAt`
- `executiveSummary`
- `userMetrics`
- `learningMetrics`
- `subjectPerformance`
- `levelPerformance`
- `questionPerformance`
- `contentQa`
- `importHistory`
- `buildInformation`
- `systemHealth`

### User Metrics

Tracks parent/account-level beta activity.

Fields:

- `date`
- `subject`
- `newParents`
- `activeParents`
- `childProfiles`
- `returningFamilies`

### Learning Metrics

Tracks learning-session health.

Fields:

- `sessions`
- `questionsAnswered`
- `completionRate`
- `averageAccuracy`
- `averageSessionMinutes`

### Subject Performance

Tracks subject-level readiness and usage.

Fields:

- `subjectName`
- `activeLearners`
- `sessions`
- `averageAccuracy`
- `completionRate`
- `status`

### Level Performance

Tracks level-level learning behavior.

Fields:

- `level`
- `title`
- `attempts`
- `completions`
- `averageAccuracy`
- `averageXp`

### Question Performance

Tracks item-level learning signals.

Fields:

- `questionId`
- `level`
- `prompt`
- `attempts`
- `correctRate`
- `flagged`

### Content QA

Tracks authoring/import readiness.

Fields:

- `packageName`
- `status`
- `approvedRows`
- `reviewRows`
- `warnings`
- `duplicateGroups`

### Import History

Tracks source content import attempts.

Fields:

- `fileName`
- `rows`
- `importedRows`
- `skippedRows`
- `errors`
- `warnings`
- `result`

### Build Information

Tracks release/build state.

Fields:

- `appVersion`
- `buildTarget`
- `lastBuildStatus`
- `lastBuildAt`
- `nodeRuntime`
- `notes`

### System Health

Tracks provider/service readiness.

Fields:

- `label`
- `status`
- `detail`
- `lastCheckedAt`

## Future Supabase Mapping

Potential future sources:

- Parent profile table for user counts.
- Child profile table for learner counts.
- Child progress table for XP, stars, completed levels, and last played.
- Future attempt/event table for question-level analytics.
- Content import reports for QA and import history.

No new tables were created for this phase.
