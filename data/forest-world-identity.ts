import {
  mathematicsForestWorldPackage,
  normalizeLearningBadgeName,
  normalizeLearningWorldId,
} from "@/data/learning-packages";

/** Compatibility identity for the active Mathematics Year 1 MVP world. */
export const forestWorldIdentity = {
  worldId: mathematicsForestWorldPackage.worldId,
  subject: mathematicsForestWorldPackage.subject,
  year: mathematicsForestWorldPackage.year,
  bossName: "Forest Guardian",
  completionBadge: mathematicsForestWorldPackage.badge.completionBadge,
} as const;

const LEGACY_FOREST_WORLD_ID = "math-forest-world";
const LEGACY_FOREST_BADGE = "Forest Guardian Badge";

/** Keeps local progress created before the Phase 2 identity standardization usable. */
export function normalizeForestWorldId(value: unknown) {
  const normalized = normalizeLearningWorldId(value);
  if (normalized === LEGACY_FOREST_WORLD_ID || normalized === forestWorldIdentity.worldId) {
    return forestWorldIdentity.worldId;
  }

  return forestWorldIdentity.worldId;
}

/** Renames the old completion badge without changing any earned progress. */
export function normalizeForestBadgeName(value: string) {
  return normalizeLearningBadgeName(value === LEGACY_FOREST_BADGE ? forestWorldIdentity.completionBadge : value);
}
