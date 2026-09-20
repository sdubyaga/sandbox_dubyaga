import { test } from "@fixtures/page.fixture";
import { User } from "@test-data/users";

test('Required fields on Login page', async ({login}) => {
    const testUser = {
        userName: User.TestUser.UserName,
        password: User.TestUser.Password
    };

    await login.open();
    await login.expectUserNameRequiredError();
    await login.expectPasswordRequiredError();

    await login.enterUserName(testUser);
    await login.expectPasswordRequiredError();

    await login.cleanUserName();
    await login.enterPassword(testUser);
    await login.expectUserNameRequiredError();
});
