import { useEffect } from "react";
import type { Settings } from "../lib/types";

const DARK_MQ = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null;

/** sets <html data-theme> (none = follow the device) and the browser bar colour. index.html applies it before first paint. */
const applyTheme = (theme: Settings["theme"]) => {
  const root = document.documentElement;
  if (theme === "auto") delete root.dataset.theme;
  else root.dataset.theme = theme;
  const dark = theme === "dark" || (theme === "auto" && !!DARK_MQ?.matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#14171f" : "#fbfaf5");
};

export const useTheme = (theme: Settings["theme"]) => {
  useEffect(() => {
    applyTheme(theme);
    if (theme !== "auto" || !DARK_MQ) return;
    const f = () => applyTheme("auto");
    DARK_MQ.addEventListener("change", f);
    return () => DARK_MQ.removeEventListener("change", f);
  }, [theme]);
};
