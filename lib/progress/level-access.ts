export const FOREST_FIRST_LEVEL = 1;
export const FOREST_LAST_LEVEL = 10;

export type ForestLevelAccessReason =
  | "level-one"
  | "previous-level-complete"
  | "previous-level-required"
  | "invalid-level";

export type ForestLevelAccess = {
  accessible: boolean;
  level: number;
  requiredLevel: number | null;
  reason: ForestLevelAccessReason;
};

function getCompletedLevelSet(completedLevels: readonly number[]) {
  return new Set(
    completedLevels.filter((level) => Number.isInteger(level) && level >= FOREST_FIRST_LEVEL && level <= FOREST_LAST_LEVEL),
  );
}

export function getForestLevelAccess(level: number, completedLevels: readonly number[]): ForestLevelAccess {
  if (!Number.isInteger(level) || level < FOREST_FIRST_LEVEL || level > FOREST_LAST_LEVEL) {
    return {
      accessible: false,
      level,
      requiredLevel: null,
      reason: "invalid-level",
    };
  }

  if (level === FOREST_FIRST_LEVEL) {
    return {
      accessible: true,
      level,
      requiredLevel: null,
      reason: "level-one",
    };
  }

  const requiredLevel = level - 1;
  const completedLevelSet = getCompletedLevelSet(completedLevels);

  if (completedLevelSet.has(requiredLevel)) {
    return {
      accessible: true,
      level,
      requiredLevel,
      reason: "previous-level-complete",
    };
  }

  return {
    accessible: false,
    level,
    requiredLevel,
    reason: "previous-level-required",
  };
}

export function isForestLevelAccessible(level: number, completedLevels: readonly number[]) {
  return getForestLevelAccess(level, completedLevels).accessible;
}
