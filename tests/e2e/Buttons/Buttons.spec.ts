import { test } from '@fixtures/page.fixture';

test('@AI Buttons page handles a double click', async ({ buttons }) => {
    await buttons.doubleClick();
    await buttons.verifyDoubleClickMessage();
});

test('@AI Buttons page handles a right click', async ({ buttons }) => {
    await buttons.rightClick();
    await buttons.verifyRightClickMessage();
});

test('@AI Buttons page handles a regular click', async ({ buttons }) => {
    await buttons.click();
    await buttons.verifyClickMessage();
});