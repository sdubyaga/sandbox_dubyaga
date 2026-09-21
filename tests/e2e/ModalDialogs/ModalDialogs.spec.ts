import { test } from '@fixtures/page.fixture';

test('@AI Modal Dialogs visitor can view modal controls', async ({ modalDialogs }) => {
    await modalDialogs.verifyNoModalIsVisible();
    await modalDialogs.verifyPageControlsAreAvailable();
});

test('@AI Modal Dialogs visitor can open the small modal', async ({ modalDialogs }) => {
    await modalDialogs.openSmallModal();
    await modalDialogs.verifySmallModalIsVisible();
});

test('@AI Modal Dialogs visitor can close the small modal', async ({ modalDialogs }) => {
    await modalDialogs.openSmallModal();
    await modalDialogs.verifySmallModalIsVisible();
    await modalDialogs.closeModal();
    await modalDialogs.verifyModalIsClosed();
    await modalDialogs.verifyPageControlsAreAvailable();
});

test('@AI Modal Dialogs visitor can inspect the large modal', async ({ modalDialogs }) => {
    await modalDialogs.openLargeModal();
    await modalDialogs.verifyLargeModalIsVisible();
    await modalDialogs.verifyLargeModalCanScroll();
});

test('@AI Modal Dialogs visitor can close the large modal', async ({ modalDialogs }) => {
    await modalDialogs.openLargeModal();
    await modalDialogs.verifyLargeModalIsVisible();
    await modalDialogs.closeModal();
    await modalDialogs.verifyModalIsClosed();
    await modalDialogs.verifyPageControlsAreAvailable();
});

test('@AI Modal Dialogs visitor can open a different modal after closing one', async ({ modalDialogs }) => {
    await modalDialogs.openSmallModal();
    await modalDialogs.verifySmallModalIsVisible();
    await modalDialogs.closeModal();
    await modalDialogs.verifyModalIsClosed();
    await modalDialogs.openLargeModal();
    await modalDialogs.verifyOnlyLargeModalCanBeOpened();
});

test('@AI Modal Dialogs visitor cannot use page controls behind an open modal', async ({ modalDialogs }) => {
    await modalDialogs.openSmallModal();
    await modalDialogs.verifyPageBehindModalIsBlocked();
    await modalDialogs.closeModal();
    await modalDialogs.verifyPageControlsAreAvailable();
});

test('@AI Modal Dialogs visitor can repeatedly open and close modal dialogs', async ({ modalDialogs }) => {
    for (let cycle = 0; cycle < 3; cycle += 1) {
        await modalDialogs.openSmallModal();
        await modalDialogs.verifySmallModalIsVisible();
        await modalDialogs.closeModal();
        await modalDialogs.verifyModalIsClosed();
    }

    for (let cycle = 0; cycle < 3; cycle += 1) {
        await modalDialogs.openLargeModal();
        await modalDialogs.verifyLargeModalIsVisible();
        await modalDialogs.closeModal();
        await modalDialogs.verifyModalIsClosed();
    }

    await modalDialogs.verifyPageControlsAreAvailable();
});