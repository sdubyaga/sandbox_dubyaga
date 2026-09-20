import { Page } from '@playwright/test';

// Function to make screenshot
export async function makeScreenshot(page: Page, name: string) {
   await page.screenshot({path: `./artifacts/screenshots/${name}.png`, fullPage: true});
}






