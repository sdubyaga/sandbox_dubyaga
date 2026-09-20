import { test, expect } from "@fixtures/page.fixture";
import { URLS } from '@test-data/urls';
import { TOC_NAVIGATION } from '@test-data/toc-navigation';

test.describe('TOC navigation test suite', () => {
    for (const sectionData of TOC_NAVIGATION) {
        test(`Verify links of the <${sectionData.name}> section`, async ({ toc, page }) => {
            for (const [category, expectedUrl] of sectionData.links) {
                await page.goto(URLS.ELEMENTS);
                await toc.expandSection(toc.Section[sectionData.section]);
                await toc.openCategory(toc.Category[category]);
                await expect(page).toHaveURL(expectedUrl);
            }
        });
    }
});