import { defineConfig, devices } from '@playwright/test';
import type { TypeOptions } from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config()

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TypeOptions>({
  //testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json',{outputFile:'test-results/Report/report.json'}],
    ['junit',{outputFile:'test-results/Report/report.xml'}],
    ['html'],
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        uploadToArgos: !!process.env.CI,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://demo.nopcommerce.com/',
    titleValue : 'nopCommerce demo store',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
  },
  globalSetup: require.resolve('./tests/setups-eg/global.setup.ts'),
  globalTeardown: require.resolve('./tests/setups-eg/globalteardown.setup.ts'),

  /* Configure projects for major browsers */
  projects: [
    {name: 'setup', testMatch:'auth.setup.ts'},
    {
      name: 'prj-setup',
      testMatch: 'project.setup.ts',
      dependencies: ['setup'],
      teardown: 'prj-setup-teardown'
    },
    {
      name: 'prj-setup-teardown',
      testMatch: 'projectteardown.setup.ts'
    },
    {
      name: 'chromium',
      use: { browserName: 'chromium',
        video: {
          mode : 'on',
          size : {width:1920,height:1080}
        },
        viewport : {
          width:1920,height:1080
        }
      }
    },
    {
      name: 'runUsingAuth',//loggin will be skipped
      use: { ...devices['Desktop Chrome'],
        storageState: '.auth/users.json',
        video: {
          mode : 'on',
          size : {width:1920,height:1080}
        },
        viewport : {
          width:1920,height:1080
        }
      },
      dependencies : ['setup']
    },

    {
      name: 'prjsetuptest',
      testMatch: 'project.spec.ts',
      use: {
        browserName: 'chromium',
        storageState: '.auth/users.json'
      },
      dependencies: ['prj-setup']
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],storageState: '.auth/users.json'},
      dependencies : ['setup']
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});