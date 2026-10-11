import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

// Project conventions enforced here are documented in AGENTS.md.
const arrowOnly = {
  // arrow functions only (classes are allowed where React requires them, e.g. app/ErrorBoundary.tsx)
  "func-style": ["error", "expression"],
  "prefer-arrow-callback": "error",
  "no-restricted-syntax": ["error", { selector: "FunctionExpression:not(MethodDefinition > FunctionExpression)", message: "Use an arrow function." }],
};

export default tseslint.config(
  { ignores: ["dist", "node_modules", "coverage"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, jsxA11y.flatConfigs.recommended],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" }],
      "@typescript-eslint/no-non-null-assertion": "off",
      // focus is moved on purpose to the next input/answer button in practice sessions
      "jsx-a11y/no-autofocus": "off",
      eqeqeq: ["error", "smart"],
      ...arrowOnly,
    },
  },
  {
    files: ["scripts/**/*.mjs", "*.config.{js,ts}"],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 2022, sourceType: "module", globals: globals.node },
    rules: { ...arrowOnly },
  },
  {
    files: ["public/sw.js"],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 2022, sourceType: "script", globals: globals.serviceworker },
    rules: { ...arrowOnly },
  },
);
