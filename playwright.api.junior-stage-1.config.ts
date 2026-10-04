import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api/junior-stage-1',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'https://httpbin.org',
  },
});