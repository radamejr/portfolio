import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov", "json-summary"],
      include: ["app/**/*.{ts,tsx}"],
      exclude: ["app/**/*.test.{ts,tsx}", "app/**/+types/**"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
