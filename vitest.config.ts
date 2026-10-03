import { defineConfig } from "vitest/config";

// Unit tests for pure logic (no DOM). Test files sit next to the code they test.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "scripts/**/*.test.mjs"],
  },
});
