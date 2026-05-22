import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "_archive/**",
    // apps/mobile/ uses Expo's own lint rules; supabase/functions/ is Deno.
    // Each workspace owns its own lint job (see .github/workflows/ci.yml).
    "apps/**",
    "supabase/functions/**",
  ]),
]);

export default eslintConfig;
