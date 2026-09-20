import { test } from "@fixtures/page.fixture";
import { User } from "@test-data/users";
import { verifyPlaceholder } from "@helpers/inputs.helper";

test('Check placeholder values on Login page', async ({login}) => {   
    await login.open();
    await verifyPlaceholder(login.loginUserName,User.Placeholder.UserName);
    await verifyPlaceholder(login.loginPassword,User.Placeholder.Password);
})