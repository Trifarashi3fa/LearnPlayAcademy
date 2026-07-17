export const FOREST_FIRST_LEVEL = 1;
export const FOREST_LAST_LEVEL = 10;

export type LevelAccessReason =
  | "level-one"
  | "previous-level-complete"
  | "previous-level-required"
  | "invalid-level";

export type LevelAccess = {
  accessible: boolean;
  level: number;
  requiredLevel: number | null;
  reason: LevelAccessReason;
};

export type ForestLevelAccessReason = LevelAccessReason;
export type ForestLevelAccess = LevelAccess;

function getCompletedLevelSet(completedLevels: readonly number[], totalLevels: number) {
  return new Set(
    completedLevels.filter((level) => Number.isInteger(level) && level >= FOREST_FIRST_LEVEL && level <= totalLevels),
  );
}

export function getLevelAccess({
  level,
  completedLevels,
  totalLevels,
}: {
  level: number;
  completedLevels: readonly number[];
  totalLevels: number;
}): LevelAccess {
  if (!Number.isInteger(level) || !Number.isInteger(totalLevels) || level < FOREST_FIRST_LEVEL || totalLevels < FOREST_FIRST_LEVEL || level > totalLevels) {
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
  const completedLevelSet = getCompletedLevelSet(completedLevels, totalLevels);

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

export function getForestLevelAccess(level: number, completedLevels: readonly number[]): ForestLevelAccess {
  return getLevelAccess({ level, completedLevels, totalLevels: FOREST_LAST_LEVEL });
}

export function isLevelAccessible(level: number, completedLevels: readonly number[], totalLevels: number) {
  return getLevelAccess({ level, completedLevels, totalLevels }).accessible;
}

export function isForestLevelAccessible(level: number, completedLevels: readonly number[]) {
  return getForestLevelAccess(level, completedLevels).accessible;
}
