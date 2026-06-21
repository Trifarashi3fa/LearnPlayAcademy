/** Canonical identity for the active Mathematics Year 1 MVP world. */
export const forestWorldIdentity = {
  worldId: "forest-world",
  subject: "mathematics",
  year: 1,
  bossName: "Forest Guardian",
  completionBadge: "Forest Explorer Badge",
} as const;

const LEGACY_FOREST_WORLD_ID = "math-forest-world";
const LEGACY_FOREST_BADGE = "Forest Guardian Badge";

/** Keeps local progress created before the Phase 2 identity standardization usable. */
export function normalizeForestWorldId(value: unknown) {
  if (value === LEGACY_FOREST_WORLD_ID || value === forestWorldIdentity.worldId) {
    return forestWorldIdentity.worldId;
  }

  return forestWorldIdentity.worldId;
}

/** Renames the old completion badge without changing any earned progress. */
export function normalizeForestBadgeName(value: string) {
  return value === LEGACY_FOREST_BADGE ? forestWorldIdentity.completionBadge : value;
}