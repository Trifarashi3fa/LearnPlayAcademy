import type { ProgressWorldRef } from "@/data/progress-types";

export const englishWorldIdentity = {
  worldId: "forest-world",
  subject: "english",
  year: 1,
  bossName: "Forest Guardian English Challenge",
  completionBadge: "Forest Reader Badge",
} as const;

export const ENGLISH_PROGRESS_REF: ProgressWorldRef = {
  subject: englishWorldIdentity.subject,
  year: englishWorldIdentity.year,
  worldId: englishWorldIdentity.worldId,
};
