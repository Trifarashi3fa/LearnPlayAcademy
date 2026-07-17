# Beta Metrics Definition

This document maps LearnPlay beta questions to analytics events. The current implementation does not connect to an external provider; it defines the measurement contract and local instrumentation layer.

## Activation Metrics

- Parent registration started/completed: `auth_register_started`, `auth_register_completed`
- Login success/failure: `auth_login_started`, `auth_login_completed`
- Child profile presence: `parent_account_viewed`
- Subject entry: `subject_selection_viewed`, `subject_card_clicked`

## Learning Engagement

- World map visits: `world_map_viewed`
- Level starts: `level_started`
- Question views: `question_viewed`
- Answers submitted: `question_answered`
- Next question actions: `question_next_clicked`
- Session starts/ends: `learning_session_started`, `learning_session_ended`

## Learning Quality

- Correct-answer rate: derive from `question_answered.correct`.
- Level completion rate: derive from `level_started` to `level_completed`.
- Explanation usage: derive from `explanation_opened` and `explanation_closed`.
- LearnBot exposure: derive from `learnbot_hint_viewed` and `learnbot_tip_viewed`.

## Progression and Retention

- Current level reach: derive from `world_map_viewed.currentLevel` and `level_completed.level`.
- Locked level attempts: `world_locked_level_viewed`.
- Rewards interest: `rewards_viewed`, `badge_awarded`.
- Parent follow-up: `parent_dashboard_viewed`, `parent_dashboard_cta_clicked`.

## Closed Beta Success Signals

- Parents can register/login without repeated auth failures.
- Learners start Level 1 and complete at least one level.
- Learners use explanations after wrong answers.
- Locked-level direct URL attempts are blocked and returned to map.
- Parent dashboard is visited after at least one level completion.
- Reward view is visited after badge or stars are earned.

## Non-Goals For This Phase

- No external analytics provider.
- No Supabase analytics table.
- No payment/premium conversion tracking.
- No personally identifying child data in events.
- No English activation metrics until English gameplay is explicitly enabled.
