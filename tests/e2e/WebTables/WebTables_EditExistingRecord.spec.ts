import { test } from "@fixtures/page.fixture";
import { User } from '@test-data/users'; 

test('Edit existing record in the Web Table', async ({webTable}) =>{

    await webTable.open();
    await webTable.clickEditButtonOnRandomRow();
    await webTable.cleanAllValuesOnRegistationForm();
    await webTable.setAllValuesOnRegistrationForm(User.TestUserModified);
    await webTable.clickSubmitButton();
    await webTable.isTableContainsRow(User.TestUserModified);
})