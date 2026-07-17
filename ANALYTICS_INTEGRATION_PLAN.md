# Analytics Integration Plan

## Phase 0: Mock Dashboard

Status: implemented.

- Internal route uses mock data only.
- Data access goes through service interfaces.
- Filters and summary helpers are pure and testable.
- No production analytics provider is connected.

## Phase 1: Admin Access Control

Before real analytics data is connected:

1. Add authenticated admin role checks.
2. Confirm admins are managed outside child/parent accounts.
3. Keep `/dev/admin-analytics` unavailable to public users.
4. Add audit logging for admin views if sensitive data appears.

## Phase 2: Supabase Read-Only Connector

Potential connector responsibilities:

- Load child profile counts.
- Load progress summaries by subject/year/world.
- Load badge and completion summaries.
- Load sync status and last-played timestamps.

Rules:

- Use read-only queries.
- Do not modify progress from analytics views.
- Keep child identity minimal and aggregate by default.
- Do not expose child nicknames unless needed for support workflows.

## Phase 3: Event Analytics Provider

Potential provider sources:

- Vercel Analytics for page/event traffic.
- Vercel Speed Insights for performance.
- Future first-party event table for question attempts and session events.

Recommended event names:

- `lesson_started`
- `question_answered`
- `level_completed`
- `world_completed`
- `profile_created`
- `progress_synced`
- `content_imported`

## Phase 4: Content QA Analytics

Connect generated import reports and QA reports to the dashboard:

- Content package status.
- Approved/review/rejected counts.
- Duplicate groups.
- Warning trends.
- Import failures.

## Phase 5: Production Hardening

Before public admin use:

- Role-based access control.
- Admin route monitoring.
- Data retention policy.
- Privacy/legal review.
- Documentation for support and operations.

## Non-Goals for This Phase

- No Supabase schema changes.
- No production analytics collection.
- No learner-facing UI changes.
- No English gameplay activation.
