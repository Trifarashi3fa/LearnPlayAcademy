export const objectVisualMap = {
  apple: { singular: "apple", plural: "apples", kind: "apple" },
  orange: { singular: "orange", plural: "oranges", kind: "orange" },
  star: { singular: "star", plural: "stars", kind: "star" },
  bird: { singular: "bird", plural: "birds", kind: "bird" },
  shell: { singular: "shell", plural: "shells", kind: "shell" },
  berry: { singular: "berry", plural: "berries", kind: "berry" },
  nut: { singular: "nut", plural: "nuts", kind: "nut" },
  coin: { singular: "coin", plural: "coins", kind: "coin" },
  flower: { singular: "flower", plural: "flowers", kind: "flower" },
  duck: { singular: "duck", plural: "ducks", kind: "duck" },
  ball: { singular: "ball", plural: "balls", kind: "ball" },
  leaf: { singular: "leaf", plural: "leaves", kind: "leaf" },
  tree: { singular: "tree", plural: "trees", kind: "tree" },
  pencil: { singular: "pencil", plural: "pencils", kind: "pencil" },
  butterfly: { singular: "butterfly", plural: "butterflies", kind: "butterfly" },
  crayon: { singular: "crayon", plural: "crayons", kind: "crayon" },
  fish: { singular: "fish", plural: "fish", kind: "fish" },
  marble: { singular: "marble", plural: "marbles", kind: "marble" },
  rabbit: { singular: "rabbit", plural: "rabbits", kind: "rabbit" },
  gem: { singular: "gem", plural: "gems", kind: "gem" },
  badge: { singular: "badge", plural: "badges", kind: "badge" },
  firefly: { singular: "firefly", plural: "fireflies", kind: "firefly" },
  box: { singular: "box", plural: "boxes", kind: "box" },
  balloon: { singular: "balloon", plural: "balloons", kind: "balloon" },
  stone: { singular: "stone", plural: "stones", kind: "stone" },
  sticker: { singular: "sticker", plural: "stickers", kind: "sticker" },
  number: { singular: "counter", plural: "counters", kind: "number" },
  object: { singular: "object", plural: "objects", kind: "object" },
} as const;

export type VisualObjectName = keyof typeof objectVisualMap;

export function getObjectVisual(object: VisualObjectName) {
  return objectVisualMap[object];
}