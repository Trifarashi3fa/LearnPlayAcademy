import type { ProgressWorldRef } from "@/data/progress-types";

export const scienceWorldIdentity = {
  worldId: "forest-world",
  subject: "science",
  year: 1,
  bossName: "Forest Guardian Science Challenge",
  completionBadge: "Forest Scientist Badge",
} as const;

export const SCIENCE_PROGRESS_REF: ProgressWorldRef = {
  subject: scienceWorldIdentity.subject,
  year: scienceWorldIdentity.year,
  worldId: scienceWorldIdentity.worldId,
};
