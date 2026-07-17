"use client";

import type { LearningAnalyticsEventName, LearningAnalyticsPayload } from "./catalog";
import { createLearningAnalyticsService, type LearningAnalyticsService } from "./service";

let service: LearningAnalyticsService | null = null;

export function getLearningAnalyticsClient() {
  service ??= createLearningAnalyticsService();
  return service;
}

export function setLearningAnalyticsClient(nextService: LearningAnalyticsService | null) {
  service = nextService;
}

export function trackLearningEvent<TName extends LearningAnalyticsEventName>(name: TName, payload: LearningAnalyticsPayload<TName>) {
  try {
    void getLearningAnalyticsClient().track(name, payload);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[LearnPlay analytics] track failed", error);
    }
  }
}
