import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode: static output only (index.html + assets), no Node server.
  // Required for static hosting on S3 — see .github/workflows/deploy.yml.
  ssr: false,
} satisfies Config;
