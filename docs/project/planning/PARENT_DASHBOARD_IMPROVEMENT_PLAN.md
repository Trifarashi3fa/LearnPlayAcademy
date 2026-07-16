# Parent Dashboard Improvement Plan

Date: 2026-07-12  
Project: LearnPlay Academy  
Scope: Audit and practical MVP improvement plan for the current Parent Dashboard, progress data, reward summaries, sync state, and child-learning summaries.

## 1. Current-State Summary

The current MVP Parent Dashboard lives at `/mvp/parent-dashboard` and renders `ParentDashboardClient`.

It currently shows:

- progress sync status
- total XP
- completed levels
- accuracy
- mastery level
- Forest World progress bar
- strong topics
- topics to practice next
- subject progress
- Forest World level completion list
- questions answered
- correct answers
- stars earned
- links to Forest World Map and Rewards

The dashboard uses `useMvpProgress`, which reads local progress from `learnplay-mvp-progress-v2`, optionally loads/saves child progress through Supabase, and exposes a world-aware Forest progress record.

This is a good foundation, but the parent insights are still mostly completion-based rather than learning-analytics-based. For example, strong topics are currently the last completed levels, and weak topics are currently the first incomplete levels. That is useful for navigation, but it is not yet true topic mastery.

## 2. Strengths

- The dashboard already uses the standardized MVP UI components: `MvpSurface`, `MvpMetricCard`, `MvpProgressBar`, `MvpStatusPill`, and `MvpEmptyState`.
- Progress is world-aware and scoped to Mathematics Year 1 Forest World.
- Supabase child progress persistence exists through `child_progress`.
- Local-first behavior works when signed out or not configured.
- Sync state is visible in parent-friendly wording.
- XP, stars, badges, completed levels, question totals, and accuracy are available.
- The dashboard avoids exposing unnecessary child personal data.
- RLS policies protect child progress by `parent_id`.
- Current route flow is stable and does not require new backend work for basic MVP improvements.

## 3. Gaps

### P0 Gaps

- No true weekly progress view.
- No learning streak calculation.
- Weak-topic detection is not based on actual missed questions.
- Recommended practice is not personalized beyond incomplete levels.
- Recent activity is not shown as a parent-readable timeline.
- Initial load can briefly show default local data before remote child progress finishes loading.
- Empty states are generic and could better explain what parents should do next.

### P1 Gaps

- No "time spent" or "sessions this week" metrics.
- No separation between first attempts and replay attempts.
- Aggregate `questionsAnswered` and `correctAnswers` increase on replays, so parent accuracy can become inflated or confusing.
- No per-topic mastery table.
- No trend indicator such as "improved this week" or "needs practice".

### P2 Gaps

- No downloadable/printable progress report.
- No parent notification preferences.
- No multi-child dashboard.
- No cross-subject comparison.
- No assessment history.

## 4. MVP Requirements

### P0: Required Before Beta

1. Parent summary card with plain-language status:
   - "Dami has completed 3 of 10 Forest World levels."
   - "Next recommended practice: Counting Objects."

2. Weekly progress widget:
   - show completed levels this week where timestamp data exists
   - show fallback copy when weekly data is unavailable

3. Learning streak widget:
   - show current streak if date data supports it
   - otherwise show "Complete one mission today to start a streak"

4. Recommended practice widget:
   - start with next incomplete level
   - later upgrade to weak-topic detection

5. Recent activity widget:
   - show latest level completions from `levelCompletions`
   - show sync timestamp when detailed activity is unavailable

6. Improved empty/loading/error states:
   - "Create child profile to save progress"
   - "No completed missions yet"
   - "Progress is stored locally until you log in"

7. Parent-friendly language:
   - supportive, non-judgmental wording
   - no shame labels for low accuracy

### P1: Valuable For Beta

1. Topic performance by level/topic.
2. Best score per level.
3. Accuracy trend based on recent attempts.
4. Badge/reward summary with "earned" and "next badge".
5. Parent action tips such as "Practice 5 minutes with counting objects".

### P2: Post-Beta

1. True activity event log.
2. Time-on-task.
3. Assessment report.
4. Downloadable parent PDF.
5. Multi-child family dashboard.
6. Cross-world and cross-subject analytics.

## 5. Post-MVP Requirements

- Store a structured `learning_events` or `child_activity_events` table.
- Store per-question first-attempt correctness.
- Store per-topic and per-learning-objective performance.
- Store assessment attempts separately from practice attempts.
- Add report generation pipeline.
- Add privacy-aware parent notification preferences.
- Support multiple children under one parent account.

## 6. Widget-by-Widget Recommendations

| Widget | Current State | Recommendation | Priority | Complexity |
|---|---|---|---|---|
| Sync Status | Present | Keep, but add clearer child-profile action when not synced. | P0 | Small |
| Total XP | Present | Keep; add "earned from completed missions" helper text. | P0 | Small |
| Stars | Present in summary/rewards | Add to dashboard top row. | P0 | Small |
| Completed Levels | Present | Keep; add next unlocked level. | P0 | Small |
| Accuracy | Present | Clarify that this is based on recorded attempts; later separate first attempts from replay. | P0 | Small |
| Mastery Level | Present | Keep but explain labels in parent language. | P1 | Small |
| Weekly Progress | Missing | Add a 7-day activity card based on `levelCompletions.completedAt` where available. | P0 | Medium |
| Learning Streak | Missing | Add daily streak based on completion dates; fallback until richer events exist. | P0 | Medium |
| Strong Topics | Completion-based | Rename for MVP to "Recently completed skills" until actual topic analytics exists. | P0 | Small |
| Weak Topics | Incomplete-level-based | Rename to "Practice next" for MVP; true weak-topic detection later. | P0 | Small |
| Recommended Practice | Missing | Add one CTA to the next incomplete level. | P0 | Small |
| Recent Activity | Missing | Add latest 3 level completions and last saved time. | P0 | Medium |
| Rewards Summary | Basic link only | Add badges earned and next badge preview. | P1 | Medium |
| Empty State | Partial | Add specific empty states for no child profile, no progress, no sync, and completed world. | P0 | Small |
| Error State | Partial sync label | Add visible retry/account guidance when sync status is error. | P0 | Small |

## 7. Required Data Fields

### Already Available

- `totalXp`
- `totalStars`
- `badges`
- `completedWorlds`
- `unlockedWorlds`
- `currentLevel`
- `completedLevels`
- `levelStars`
- `levelCompletions`
- `questionAttempts`
- `questionsAnswered`
- `correctAnswers`
- `last_played_at`
- child `nickname`
- child `yearLevel`
- child `avatar`

### Needed For Better MVP Insights

These can be derived now, but may need normalization later:

- latest completed level
- next recommended level
- latest activity list
- completion dates by day
- level best score
- level best stars
- simple weekly completed-level count
- simple streak count based on completion dates

### Needed For Post-MVP Analytics

- activity event ID
- session ID
- startedAt
- completedAt
- durationSeconds
- questionId
- topicId
- learningObjectiveId
- firstAttemptCorrect
- finalAttemptCorrect
- attemptsCount
- hintUsed
- explanationOpened
- assessmentId
- practiceRecommendationReason

## 8. Existing Data That Can Be Reused

- `LocalProgressV2` can support summary cards, completion counts, XP, stars, badges, current world, current level, completed worlds, and unlocked worlds.
- `WorldProgressRecord.levelCompletions` can support recent completed levels, best stars, best correct answers, and basic weekly completion if `completedAt` values are trustworthy.
- `WorldProgressRecord.questionAttempts` can support rough replay history by question ID.
- `child_progress.progress_data` stores the full local model and can be used for richer dashboard derivations without changing schema immediately.
- `child_progress.last_played_at` can support the "last played" summary.
- `forestLevels` gives friendly level titles and node types.

## 9. Missing Backend Or Progress Data

- No durable per-session activity log.
- No time-on-task.
- No first-attempt-only accuracy.
- No topic-level records in progress.
- No direct weak-skill scores.
- No recommended practice reason stored.
- No assessment history.
- No weekly rollup table.
- No parent notification settings.

The existing `progress_data` JSON is enough for a beta dashboard, but a proper analytics model should be added before advanced reporting.

## 10. Responsive Layout Recommendation

### Mobile

Order should be:

1. Child summary and sync state
2. Continue / recommended practice CTA
3. This week
4. XP, stars, completed levels
5. Recent activity
6. Practice next
7. Level list collapsed or compact

Use single-column cards, large tap targets, and short parent-readable text.

### Tablet

Use two-column cards:

- left: child summary, weekly progress, recommended practice
- right: rewards, recent activity, sync state

### Desktop

Use a parent dashboard hierarchy:

- top band: child summary + sync + continue CTA
- metric row: XP, stars, levels, accuracy
- insight row: weekly progress, streak, recommended practice
- detail row: recent activity, level completion, rewards

Avoid making the level list the dominant visual element.

## 11. Accessibility Requirements

- Every progress bar needs a text label and percentage.
- Metric cards should not rely on color alone.
- Sync and error statuses should use `role="status"` or `aria-live="polite"` where appropriate.
- Error alerts should use `role="alert"`.
- Buttons and links should remain at least 44px high.
- Dashboard headings should follow logical hierarchy.
- Recent activity should be rendered as a list.
- Avoid tiny timestamps without readable labels.
- Keep contrast high for yellow and pastel cards.
- Ensure keyboard focus is visible on all CTA links.

## 12. Privacy Considerations

- Continue using child nickname only; do not request full name, birthdate, school, or class.
- Keep dashboard visible only to authenticated parent when using account area.
- Keep RLS policies enabled for `child_profiles` and `child_progress`.
- Avoid public URLs that expose child-specific data.
- Avoid comparative ranking against other children.
- Avoid shaming language such as "weak" in the UI; use "Practice next" or "Needs a little more practice".
- Parent-facing summaries should be encouraging and educational, not surveillance-heavy.
- Do not expose detailed wrong answers to anyone except the authenticated parent.
- If weekly reports or notifications are added later, require explicit parent consent.

## 13. Implementation Phases

### Phase PD-1: Rename And Reframe Current Insights

Goal: Make the current dashboard more accurate without backend changes.

Tasks:

- Rename "Strong Topics" to "Recently completed skills".
- Rename "Topics To Practice Next" to "Recommended practice".
- Add one primary CTA to the next incomplete level.
- Add helper copy explaining local/account sync state.
- Add better no-progress empty states.

Priority: P0  
Complexity: Small

### Phase PD-2: Add Recent Activity And Weekly Snapshot

Goal: Use existing `levelCompletions.completedAt` and `last_played_at` to show timeline-style progress.

Tasks:

- Build a `deriveParentDashboardInsights(progress)` helper.
- Show latest 3 completed levels.
- Show completed missions this week.
- Show simple streak if completion dates allow it.
- Add fallbacks when timestamps are not reliable.

Priority: P0  
Complexity: Medium

### Phase PD-3: Improve Rewards And Practice Recommendations

Goal: Help parents understand motivation and what to do next.

Tasks:

- Add badge count and next badge target.
- Add "next mission" recommendation.
- Add "practice 5 minutes" parent tip.
- Show best stars per recently completed level.

Priority: P1  
Complexity: Medium

### Phase PD-4: Add True Topic Performance

Goal: Move from level-based inference to topic-level insight.

Tasks:

- Map question IDs to topic and learning objective from approved manifest.
- Calculate accuracy by topic from `questionAttempts`.
- Separate first attempt and replay attempt if data exists; otherwise add future event fields.
- Show "secure", "developing", and "practice next" topic labels.

Priority: P1  
Complexity: Large

### Phase PD-5: Add Activity Event Model

Goal: Support robust weekly reports, streaks, and assessment summaries.

Tasks:

- Design event model.
- Add migration for child activity events.
- Save one event after level completion.
- Later save assessment events.

Priority: P2  
Complexity: Large

## 14. Estimated Complexity

| Feature | Priority | Complexity |
|---|---|---|
| Rename misleading topic widgets | P0 | Small |
| Dashboard empty states | P0 | Small |
| Recommended next practice CTA | P0 | Small |
| Recent activity from level completions | P0 | Medium |
| Weekly snapshot from completion dates | P0 | Medium |
| Simple learning streak | P0 | Medium |
| Reward summary / next badge | P1 | Medium |
| Topic-level weak skill detection | P1 | Large |
| Parent PDF report | P2 | Large |
| Activity event backend | P2 | Large |
| Multi-child dashboard | P2 | Large |

## 15. Acceptance Criteria For Each MVP Feature

### P0: Parent Summary

- Shows child or learner context without requiring full child name.
- Shows Forest World progress in plain language.
- Shows current / next level.
- Shows sync state clearly.

### P0: Recommended Practice

- If no levels are complete, recommends Level 1.
- If some levels are complete, recommends the first incomplete level.
- If all levels are complete, recommends Rewards or upcoming Assessment.
- CTA opens the correct level/map route.

### P0: Weekly Progress

- Shows the count of levels completed in the current 7-day window when timestamps exist.
- Shows a friendly empty state if no weekly activity exists.
- Does not imply exact daily practice when only `last_played_at` is available.

### P0: Learning Streak

- Uses completion dates only.
- Shows 0 or "Start today" if no completion dates exist.
- Does not count repeated page visits as learning.

### P0: Recent Activity

- Shows latest completed levels sorted by completion date.
- Includes level title, node type, stars, and date.
- Shows no-progress empty state before the first completion.

### P0: Loading And Error States

- While progress sync is loading, show a calm loading state or skeleton.
- If sync fails, keep local progress visible and show account guidance.
- If signed out, explain that progress is local.
- If no child profile exists, link to `/account`.

### P1: Topic Performance

- Does not label a topic weak unless data supports it.
- Uses question-topic mapping from approved content.
- Separates incomplete content from low performance.

## 16. Risks And Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Current weak-topic logic overstates insight quality | Parents may think the app detected skill gaps when it only found incomplete levels | Rename to "Practice next" until true analytics exists |
| Replay attempts inflate accuracy | Parent accuracy may become confusing | Add copy now; later track first-attempt accuracy |
| No event log | Weekly progress and streaks may be approximate | Use level completion timestamps first; add event table later |
| Sync errors are under-explained | Parent may lose trust | Keep local progress visible and explain save state |
| Too many metrics | Dashboard may feel like an admin report | Prioritize one "what happened" and one "what to do next" section |
| Child privacy | Over-collection can create safety risk | Keep nickname-only profile and avoid unnecessary personal fields |

## Conceptual Benchmark Patterns

The plan borrows general product principles, not visual design or proprietary wording:

- Duolingo-style motivation patterns: streaks, XP, rewards, and simple progress loops.
- Khan Academy-style learning support: mastery/progress visibility and parent/teacher-friendly performance summaries.
- Lingokids-style parent trust patterns: playful learning framed with safety, simplicity, and child-friendly activity summaries.

For LearnPlay, the parent dashboard should be calmer than the child lesson screen. Parents need confidence, clarity, and next-step guidance more than dense gamification.

## Recommended First Implementation Task

Implement **Phase PD-1: Rename And Reframe Current Insights**.

This is the safest first task because it improves trust immediately without backend changes:

- rename "Strong Topics" to "Recently completed skills"
- rename "Topics To Practice Next" to "Recommended practice"
- add next-level CTA
- improve no-progress and sync-state copy
- keep the existing data model untouched

## Files Inspected

- `app/mvp/parent-dashboard/page.tsx`
- `components/mvp/ParentDashboardClient.tsx`
- `components/mvp/useMvpProgress.ts`
- `components/mvp/RewardsClient.tsx`
- `components/mvp/MvpUi.tsx`
- `components/mvp/QuestionPlayer.tsx`
- `components/mvp/explanation/ForestRewardScreen.tsx`
- `app/account/page.tsx`
- `components/account/ChildProfileManager.tsx`
- `data/progress-types.ts`
- `data/account-types.ts`
- `data/mvp-forest-world.ts`
- `lib/progress/local-progress.ts`
- `lib/progress/child-progress.ts`
- `lib/account/profiles.ts`
- `supabase/migrations/005_create_child_profiles.sql`
- `supabase/migrations/006_create_child_progress.sql`
