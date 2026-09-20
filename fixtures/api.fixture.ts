import { test as base } from '@playwright/test';
import { UserApi } from '@api/UserApi';

type ApiFixtures= {
    userApi: UserApi;
};

export const apiTest = base.extend<ApiFixtures>({
    userApi: async ({ request }, use) => {
        await use(new UserApi(request));
    },
});

export { expect } from '@playwright/test';