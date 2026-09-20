import { test } from "@fixtures/page.fixture";
import { User } from '@test-data/users';   

test('Add new record to the Web Table', async ({webTable}) =>{

    await webTable.open();
    await webTable.clickAddButton();
    await webTable.setAllValuesOnRegistrationForm(User.TestUser);
    await webTable.clickSubmitButton();
    await webTable.isTableContainsRow(User.TestUser);
})