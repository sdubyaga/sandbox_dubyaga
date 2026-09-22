import { Locator, Page, expect } from '@playwright/test';
import { URLS } from '../test-data/urls';
import { BasePage } from './BasePage';

export class ButtonsPage extends BasePage {
    private doubleClickButton: Locator;
    private rightClickButton: Locator;
    private clickButton: Locator;
    private doubleClickMessage: Locator;
    private rightClickMessage: Locator;
    private dynamicClickMessage: Locator;

    constructor(page: Page) {
        super(page, URLS.BUTTONS);
        this.doubleClickButton = this.page.locator('#doubleClickBtn');
        this.rightClickButton = this.page.locator('#rightClickBtn');
        this.clickButton = this.page.getByRole('button', { name: 'Click Me', exact: true });
        this.doubleClickMessage = this.page.locator('#doubleClickMessage');
        this.rightClickMessage = this.page.locator('#rightClickMessage');
        this.dynamicClickMessage = this.page.locator('#dynamicClickMessage');
    }

    async verifyPageIsLoaded(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Buttons' })).toBeVisible();
    }

    async doubleClick(): Promise<void> {
        await this.doubleClickButton.dblclick();
    }

    async rightClick(): Promise<void> {
        await this.rightClickButton.click({ button: 'right' });
    }

    async click(): Promise<void> {
        await this.clickButton.click();
    }

    async verifyDoubleClickMessage(): Promise<void> {
        await expect(this.doubleClickMessage).toHaveText('You have done a double click');
    }

    async verifyRightClickMessage(): Promise<void> {
        await expect(this.rightClickMessage).toHaveText('You have done a right click');
    }

    async verifyClickMessage(): Promise<void> {
        await expect(this.dynamicClickMessage).toHaveText('You have done a dynamic click');
    }
}