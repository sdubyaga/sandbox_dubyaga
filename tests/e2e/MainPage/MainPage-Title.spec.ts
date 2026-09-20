import { test } from "@fixtures/page.fixture";

test('Check the title of the home page of the DEMOQA.com site', async ({ homePage }) => {

  await homePage.open();
  await homePage.verifyPageTitle(/demo/i);
});


