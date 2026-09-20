import { Locator, expect } from '@playwright/test';

export async function cleanInput(input: Locator) {
    await input.click();
    await input.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
    await input.press('Backspace');
}

export async function verifyPlaceholder(locator: Locator, expectPlaceholder: string) {
    await expect(locator).toHaveAttribute('placeholder', expectPlaceholder);
}

export async function set(field: Locator, value: string): Promise<void> {
        await field.fill(value);
}

export async function checkIsBorderColorRed (field: Locator): Promise<void> {
        await expect(field).toHaveCSS('border-color', 'rgb(220, 53, 69)');
}