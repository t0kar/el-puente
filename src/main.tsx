import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css"; // first: global layers before feature CSS
import { App } from "./App";
import { ErrorBoundary } from "./app/ErrorBoundary";
import "./lib/firebase"; // starts auth + sync as early as possible
import { registerSW } from "./lib/push";

registerSW();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
