import { defineConfig } from "eslint/config";
import coreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next v16 ships a native flat config, so it is spread directly.
// Wrapping it in FlatCompat (the previous approach) crashes ESLint 10 with
// "Converting circular structure to JSON".
export default defineConfig([
  ...coreWebVitals,
  {
    ignores: [".next/**", "node_modules/**", "public/**"],
  },
  {
    // Pinned explicitly: eslint-plugin-react's auto-detection calls
    // context.getFilename(), removed in ESLint 10, and crashes the run.
    settings: { react: { version: "19.2" } },
    rules: {
      "react/jsx-uses-react": 0,
      "react/react-in-jsx-scope": 0,
    },
  },
]);
