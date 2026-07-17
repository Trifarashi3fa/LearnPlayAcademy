# Admin Analytics Dashboard

## Purpose

The Admin Analytics Dashboard is an internal, development-first workspace for LearnPlay Academy operators. It gives the team one place to review beta readiness, learning health, content QA, import history, build status, and system health before real analytics providers are connected.

## Route

- Development route: `/dev/admin-analytics`
- Navigation: not linked from public navigation
- Indexing: disabled with `robots: { index: false, follow: false }`
- Production behavior: disabled by default
- Optional preview flag: `NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS=true`

## Protection Model

The route is protected by `isAdminAnalyticsPreviewEnabled()` and returns `notFound()` when the dashboard is not available. This is intentionally simple for the mock-data phase. A future production admin dashboard must add authenticated role-based access before real data is connected.

## Dashboard Sections

1. Executive Summary
2. User Metrics
3. Learning Metrics
4. Subject Performance
5. Level Performance
6. Question Performance
7. Content QA
8. Import History
9. Build Information
10. System Health

## Filters

- Date range: Last 7 days, Last 30 days, Last 90 days, All demo data
- Subject: All subjects plus detected subject rows from the mock dataset

## Data Source

Current data comes from `MockAdminAnalyticsService`. It is deterministic demo data and does not connect to Supabase, Vercel Analytics, or any production analytics provider.

## What This Does Not Do

- Does not modify gameplay.
- Does not activate English.
- Does not change Supabase schema.
- Does not collect production analytics.
- Does not expose a public admin surface.

## Manual Test Steps

1. Run `npm run dev`.
2. Open `/dev/admin-analytics`.
3. Confirm all dashboard sections render.
4. Change date range and subject filters.
5. Confirm English rows show staging/content QA data but no active gameplay sessions.
6. Build production and confirm the route remains unavailable unless explicitly feature-flagged.
