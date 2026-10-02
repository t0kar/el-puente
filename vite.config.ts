import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the app from /<repo>/ — change BASE if the repo name changes.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE ?? "/el-puente/",
});
