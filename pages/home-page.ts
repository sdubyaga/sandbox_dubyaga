import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../test-data/urls';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    private plateElements: Locator;
    private plateForms: Locator;
    private plateAlertsFrameWindows: Locator;
    private plateWidgets: Locator;
    private plateInteractions: Locator;
    private plateBookStoreApplication: Locator;
    private linkSeleniumTraining: Locator;
    
    constructor(page: Page) {
        super(page,URLS.HOME);
        this.plateElements = this.page.getByRole('link', { name: 'Elements' });
        this.plateForms = this.page.getByRole('link', { name: 'Forms' });
        this.plateAlertsFrameWindows = this.page.getByRole('link', { name: 'Alerts, Frame & Windows' });
        this.plateWidgets = this.page.getByRole('link', { name: 'Widgets' });
        this.plateInteractions = this.page.getByRole('link', { name: 'Interactions' });
        this.plateBookStoreApplication = this.page.getByRole('link', { name: 'Book Store Application' });
        this.linkSeleniumTraining = this.page.getByRole('link', { name: 'Selenium Online Training' });
    }

    async verifyPageIsLoaded(): Promise<void> {
        await expect(this.linkSeleniumTraining).toBeVisible();
    }

    async open(): Promise<void>{
        await this.page.goto(URLS.HOME);
    }

    async verifyPageTitle(expectedTitle: RegExp): Promise<void> {
        await expect (this.page).toHaveTitle(expectedTitle);  
    }

    async openElements() {
        await this.plateElements.click();
    }

    async openForms() {
        await this.plateForms.click();
    }

    async openAlertsFrameWindows() {
        await this.plateAlertsFrameWindows.click();
    }

    async openWidgets() {
        await this.plateWidgets.click();
    }

    async openInteractions() {
        await this.plateInteractions.click();
    }

    async openBookStoreApplication() {
        await this.plateBookStoreApplication.click();
    }

    async openSeleniumTraining() {
        await this.linkSeleniumTraining.click();
    }
}