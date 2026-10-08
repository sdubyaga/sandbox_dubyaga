import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api/junior-stage-3',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: process.env.RESTFUL_BOOKER_BASE_URL || 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  },
});