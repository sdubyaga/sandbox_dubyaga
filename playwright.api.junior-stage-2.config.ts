import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/api/junior-stage-2',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'https://reqres.in',
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1',
    },
  },
});