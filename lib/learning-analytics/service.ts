import type { LearningAnalyticsEvent, LearningAnalyticsEventName, LearningAnalyticsPayload } from "./catalog";
import { validateLearningAnalyticsEvent } from "./catalog";

export type LearningAnalyticsService = {
  track<TName extends LearningAnalyticsEventName>(name: TName, payload: LearningAnalyticsPayload<TName>): void | Promise<void>;
  getEvents?(): LearningAnalyticsEvent[];
  clear?(): void;
};

export class NoopLearningAnalyticsService implements LearningAnalyticsService {
  track() {
    // Intentionally empty.
  }
}

export class ConsoleLearningAnalyticsService implements LearningAnalyticsService {
  track<TName extends LearningAnalyticsEventName>(name: TName, payload: LearningAnalyticsPayload<TName>) {
    const event = { name, payload, timestamp: new Date().toISOString() } as LearningAnalyticsEvent<TName>;
    const validation = validateLearningAnalyticsEvent(event);
    if (!validation.valid) {
      console.warn("[LearnPlay analytics] invalid event", validation.errors, event);
      return;
    }
    console.info("[LearnPlay analytics]", event.name, event.payload);
  }
}

export class MockLearningAnalyticsCollector implements LearningAnalyticsService {
  private events: LearningAnalyticsEvent[] = [];

  track<TName extends LearningAnalyticsEventName>(name: TName, payload: LearningAnalyticsPayload<TName>) {
    const event = { name, payload, timestamp: new Date().toISOString() } as LearningAnalyticsEvent<TName>;
    const validation = validateLearningAnalyticsEvent(event);
    if (!validation.valid) throw new Error(`Invalid analytics event: ${validation.errors.join(", ")}`);
    this.events.push(event as LearningAnalyticsEvent);
  }

  getEvents() {
    return [...this.events];
  }

  clear() {
    this.events = [];
  }
}

export function isLearningAnalyticsEnabled(env: Partial<Record<string, string | undefined>> = process.env) {
  const explicit = env.NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS;
  if (explicit === "true") return true;
  if (explicit === "false") return false;
  return env.NODE_ENV !== "production";
}

export function createLearningAnalyticsService(env: Partial<Record<string, string | undefined>> = process.env): LearningAnalyticsService {
  if (!isLearningAnalyticsEnabled(env)) return new NoopLearningAnalyticsService();
  if (env.NEXT_PUBLIC_LEARNING_ANALYTICS_PROVIDER === "mock") return new MockLearningAnalyticsCollector();
  return new ConsoleLearningAnalyticsService();
}
