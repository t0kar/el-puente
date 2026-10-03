// Course levels, in teaching order. To add a level: add it here, create its folder
// (copy src/content/a1.2/), and register the folder in src/content/index.ts.
export const LEVELS = [
  { id: "A1.1", name: "A1.1" },
  { id: "A1.2", name: "A1.2" },
] as const;

export type LevelId = (typeof LEVELS)[number]["id"];
