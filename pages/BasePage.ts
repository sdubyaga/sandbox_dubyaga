import { Locator, Page, expect } from '@playwright/test';
export abstract class BasePage {
    constructor(
        protected readonly page: Page,
        protected readonly url: string,
    ) {}
        
    async open(): Promise<void> {
        await this.page.goto(this.url);
    };
    
    abstract verifyPageIsLoaded(): Promise<void>;
}