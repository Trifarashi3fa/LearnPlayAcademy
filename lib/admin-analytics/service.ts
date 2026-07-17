import type { AdminAnalyticsService } from "./types";
import { MockAdminAnalyticsService } from "./mock-service";

export function getAdminAnalyticsService(): AdminAnalyticsService {
  // Future connector point: replace with a Supabase, Vercel, or warehouse-backed provider.
  return new MockAdminAnalyticsService();
}
