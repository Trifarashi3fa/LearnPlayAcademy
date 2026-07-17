# LearnPlay Academy Beta Known Issues

## Blocking Issues

No known blocking issue from the latest automated validation/build pass.

## Existing Turbopack Warning

The production build currently completes successfully but reports one non-blocking Turbopack NFT warning:

- Source: app/dev/question-engine-preview/page.tsx through next.config.ts trace.
- Meaning: Turbopack detected dynamic filesystem/project tracing from a developer-preview import path.
- Current impact: Build passes; production routes are generated.
- Risk: Can create noise in deployment logs and should be cleaned up before wider public launch.
- Suggested follow-up: isolate dev preview file reads to statically scoped folders or development-only code paths.

## Technical Debt

- English gameplay package remains inactive until a dedicated activation phase connects routes, manifest, and progress safely.
- English Levels 2-10 remain Review and still need quality optimization.
- Parent Dashboard uses available progress summaries, not full topic-level analytics.
- Some developer preview routes are included in the app route list and should remain hidden from public navigation.
- Asset polish and final production art may need another pass before public launch.
- Supabase progress sync should be watched closely during beta because offline/local states can be confusing for parents.

## Non-Blocking Product Issues

- English Level 1 is content-approved but not yet manually playtested in production gameplay.
- Assessment CTAs are placeholders only; no assessment engine is active.
- Premium worlds and subjects remain locked or coming soon.
- Some language in beta docs assumes controlled tester guidance, not public self-service onboarding.

## Future Enhancements

- Activate English Level 1 as a separate beta package after staging import and manual preview verification.
- Add true topic mastery analytics after enough attempt-level data is stored reliably.
- Create educator-facing review dashboard for approving English Levels 2-10.
- Add more production-ready LearnBot and badge artwork.
- Expand browser/device automation coverage.
