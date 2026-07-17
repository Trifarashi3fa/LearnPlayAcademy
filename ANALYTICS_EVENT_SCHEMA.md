# Analytics Event Schema

All LearnPlay learning analytics events use the same envelope:

```ts
type LearningAnalyticsEvent = {
  name: LearningAnalyticsEventName;
  payload: Record<string, unknown>;
  context?: {
    route?: string;
    sessionId?: string;
    userId?: string;
    childProfileId?: string;
    source?: string;
  };
  timestamp: string;
};
```

## Validation

The event catalog in `lib/learning-analytics/catalog.ts` defines required payload keys for each event. The reusable validator checks:

- event name is supported,
- timestamp is a valid ISO date string,
- required payload fields are present and non-empty.

The validator is intentionally lightweight in this phase. Provider-specific validation can be added later without changing gameplay components.

## Payload Identity Fields

Learning events should use package identity, not route assumptions:

- `subject`: currently `mathematics`, with `english` and `science` reserved for future packages.
- `year`: learner year level.
- `worldId`: currently `forest-world`.
- `level`: level number when relevant.
- `questionId`: stable content identifier when relevant.

## Privacy Boundaries

Do not include:

- parent email,
- child legal name,
- raw free-form child text unless specifically approved,
- address, phone number, school, date of birth, or precise location.

For closed beta, use aggregate learning fields such as completed level count, total XP, stars, question ID, and correctness.

## Service Implementations

`lib/learning-analytics/service.ts` provides:

- `NoopLearningAnalyticsService`: drops events safely.
- `ConsoleLearningAnalyticsService`: validates and logs events locally.
- `MockLearningAnalyticsCollector`: stores events in memory for tests and previews.

`lib/learning-analytics/client.ts` exposes `trackLearningEvent` for client components.

## Feature Flags

- `NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS=true`: enable in any environment.
- `NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS=false`: disable in any environment.
- `NEXT_PUBLIC_LEARNING_ANALYTICS_PROVIDER=mock`: use mock collector where supported.

Default behavior:

- development: enabled with console provider,
- production: disabled unless explicitly enabled.
