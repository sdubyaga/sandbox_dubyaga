import { PracticeForm } from '@pages/practice-form';
import { Login } from '@pages/login-page';
import { HomePage } from '@pages/home-page';
import { TextBoxPage } from '@pages/text-box-page';
import { TOC } from '@pages/toc';
import { WebTablePage } from '@pages/web-table-page';

import { apiTest } from './api.fixture';
import { createPageFixture } from './create-page.fixture';

type Pages = {
    login: Login;
    homePage: HomePage;
    textBox: TextBoxPage;
    toc: TOC;
    webTable: WebTablePage;
    practiceForm: PracticeForm;
};

export const test = apiTest.extend<Pages>({
    login: createPageFixture((page) => new Login(page)),
    homePage: createPageFixture((page) => new HomePage(page)),
    textBox: createPageFixture((page) => new TextBoxPage(page)),
    toc: createPageFixture((page) => new TOC(page)),
    webTable: createPageFixture((page) => new WebTablePage(page)),
    practiceForm: createPageFixture((page) => new PracticeForm(page)),
});

export { expect } from '@playwright/test';