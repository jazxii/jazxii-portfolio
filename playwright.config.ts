import { defineConfig } from "@playwright/test";

// 3210 instead of 3000 so local test runs never collide with (or reuse)
// another dev server.
const PORT = process.env.PORT ?? 3210;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL,
  },
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
