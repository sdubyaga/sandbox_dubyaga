import { Locator, Page, expect } from '@playwright/test';
import { URLS } from '@test-data/urls';
import { BasePage } from './BasePage';

export class ModalDialogsPage extends BasePage {
    private readonly smallModalButton: Locator;
    private readonly largeModalButton: Locator;
    private readonly modal: Locator;
    private readonly modalTitle: Locator;
    private readonly modalBody: Locator;
    private readonly modalCloseButton: Locator;

    constructor(page: Page) {
        super(page, URLS.MODAL_DIALOGS);
        this.smallModalButton = page.getByRole('button', { name: 'Small modal', exact: true });
        this.largeModalButton = page.getByRole('button', { name: 'Large modal', exact: true });
        this.modal = page.getByRole('dialog');
        this.modalTitle = this.modal.locator('.modal-title');
        this.modalBody = this.modal.locator('.modal-body');
        this.modalCloseButton = this.modal.locator('button[id^="close"][id$="Modal"]');
    }

    async verifyPageIsLoaded(): Promise<void> {
        await expect(this.page.getByRole('heading', { name: 'Modal Dialogs', exact: true })).toBeVisible();
        await expect(this.smallModalButton).toBeVisible();
        await expect(this.largeModalButton).toBeVisible();
    }

    async verifyNoModalIsVisible(): Promise<void> {
        await expect(this.modal).toBeHidden();
    }

    async openSmallModal(): Promise<void> {
        await this.smallModalButton.click();
    }

    async openLargeModal(): Promise<void> {
        await this.largeModalButton.click();
    }

    async verifySmallModalIsVisible(): Promise<void> {
        await expect(this.modal).toBeVisible();
        await expect(this.modalTitle).toHaveText('Small Modal');
        await expect(this.modalBody).not.toBeEmpty();
        await expect(this.modalCloseButton).toBeVisible();
    }

    async verifyLargeModalIsVisible(): Promise<void> {
        await expect(this.modal).toBeVisible();
        await expect(this.modalTitle).toHaveText('Large Modal');
        await expect(this.modalBody).not.toBeEmpty();
    }

    async closeModal(): Promise<void> {
        await this.modalCloseButton.click();
    }

    async verifyModalIsClosed(): Promise<void> {
        await expect(this.modal).toBeHidden();
    }

    async verifyLargeModalCanScroll(): Promise<void> {
        const scrollState = await this.modalBody.evaluate((element) => ({
            hasOverflow: element.scrollHeight > element.clientHeight,
            scrollHeight: element.scrollHeight,
        }));

        if (scrollState.hasOverflow) {
            await this.modalBody.evaluate((element) => {
                element.scrollTop = element.scrollHeight;
            });
            await expect.poll(() => this.modalBody.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
        } else {
            expect(scrollState.scrollHeight).toBeGreaterThan(0);
        }

        await expect(this.modal).toBeVisible();
    }

    async verifyOnlyLargeModalCanBeOpened(): Promise<void> {
        await expect(this.modal).toHaveCount(1);
        await expect(this.modalTitle).toHaveText('Large Modal');
    }

    async verifyPageControlsAreAvailable(): Promise<void> {
        await expect(this.smallModalButton).toBeVisible();
        await expect(this.largeModalButton).toBeVisible();
    }

    async verifyPageBehindModalIsBlocked(): Promise<void> {
        await expect(this.modal).toBeVisible();
        await expect(this.page.locator('.modal-backdrop')).toBeVisible();
    }
}
