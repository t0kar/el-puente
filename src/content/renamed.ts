// Card ids are the Spanish text. When a Spanish line is corrected, map "old" → "new" here so everyone keeps that card's progress
// (applied when saved data is loaded, see normalize() in lib/store.ts). Never remove entries.
export const RENAMED: Record<string, string> = {
  // 2026-10 content audit
  "quiero conocer nuevas personas": "quiero conocer gente nueva",
  "al lado": "al lado de",
  "el maní": "el cacahuete = el maní",
  "grasoso": "grasiento = grasoso",
};
