import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Public path the app is served from. GitHub Pages serves it from /<repo>/ (default below);
// Firebase Hosting and `npm run dev` with BASE=/ serve it from the root. CI passes BASE explicitly.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE ?? "/el-puente/",
});
