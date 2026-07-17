# LearnPlay Learning Analytics Event Catalog

This catalog defines the closed-beta learner analytics events used by LearnPlay. The framework is intentionally provider-neutral: events can be disabled, logged to the console, or collected by an in-memory mock service during tests and developer previews.

## Operating Rules

- Analytics must never change gameplay, answer checking, XP, stars, progression, or Supabase state.
- No child legal name, email address, raw answer text, or personally sensitive profile details should be included in event payloads.
- Production analytics are disabled unless `NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS=true`.
- Development analytics default to console logging unless explicitly disabled.
- External analytics providers are not connected in this phase.

## Event Groups

### Authentication

- `auth_register_started`: parent begins email registration.
- `auth_register_completed`: registration succeeds or fails.
- `auth_login_started`: parent begins email login.
- `auth_login_completed`: login succeeds or fails.
- `auth_logout_clicked`: parent clicks logout.
- `auth_password_reset_requested`: parent requests or completes password-reset request flow.

### Parent Actions

- `parent_account_viewed`: account page/child profile area is viewed.
- `parent_dashboard_viewed`: parent dashboard is viewed.
- `parent_dashboard_cta_clicked`: parent clicks a dashboard action.

### Child Profile Actions

- `child_profile_create_started`: child setup flow begins.
- `child_profile_update_started`: child edit flow begins.
- `child_profile_delete_requested`: child profile deletion is confirmed.
- `child_profile_year_unavailable_seen`: unsupported saved year message is shown.

### Subject Navigation

- `subject_selection_viewed`: subject selection page is viewed.
- `subject_card_clicked`: active subject card is clicked.
- `subject_unavailable_viewed`: unavailable subject state is shown.

### World Navigation

- `world_map_viewed`: Forest World map is viewed.
- `world_node_clicked`: learner clicks an unlocked map node.
- `world_locked_level_viewed`: learner opens a locked level URL.

### Level Lifecycle

- `level_intro_viewed`: level intro screen is shown.
- `level_started`: learner starts the level question session.
- `level_completed`: learner reaches level completion.

### Question Lifecycle

- `question_viewed`: question is displayed.
- `question_answered`: learner submits an answer.
- `question_next_clicked`: learner advances after feedback.
- `explanation_opened`: explanation/notes are opened.
- `explanation_closed`: explanation/notes are hidden.

### LearnBot Interactions

- `learnbot_hint_viewed`: LearnBot hint/Think Mode is shown.
- `learnbot_tip_viewed`: LearnBot feedback/tip state is shown after answering.

### Rewards

- `rewards_viewed`: rewards page is viewed.
- `badge_awarded`: completion badge is awarded.

### Session Lifecycle

- `learning_session_started`: question session starts.
- `learning_session_ended`: question session ends.

### Error Events

- `app_error`: recoverable or fatal app issue is observed.
- `analytics_event_validation_failed`: reserved for analytics validation failures.

## Current Instrumentation

The beta framework currently instruments auth forms, logout, account/profile page state, subject selection, world map views/clicks, locked-level screens, level intro/start, question view/answer/next, explanation open/close, LearnBot hint/tip states, level completion, badge award, rewards view, and parent dashboard view/CTA clicks.
