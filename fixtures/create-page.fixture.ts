import type { Page } from '@playwright/test';
import { BasePage } from '@pages/BasePage';

type Use<T> = (pageObject: T) => Promise<void>;

export function createPageFixture<T extends BasePage>(
    createPageObject: (page: Page) => T,
) {
    return async (
        { page }: { page: Page },
        use: Use<T>,
    ): Promise<void> => {
        const pageObject = createPageObject(page);

        await pageObject.open();
        await pageObject.verifyPageIsLoaded();

        await use(pageObject);
    };
}
