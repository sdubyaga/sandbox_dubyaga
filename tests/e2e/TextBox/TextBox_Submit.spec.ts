import { test } from "@fixtures/page.fixture";
import { User } from '@test-data/users';

test('TextBox happy path workflow', async ({textBox}) =>{
   
    await textBox.open();
    await textBox.setFullName(User.TestUser.FullName);
    await textBox.setEmail(User.TestUser.Email);
    await textBox.setCurrentAddress(User.TestUser.CurrentAddress);
    await textBox.setPermanentAddress(User.TestUser.PermanentAddress);
    await textBox.clickSubmitButton();
    await textBox.verifyFullNameRecord(User.TestUser.FullName);
    await textBox.verifyEmailRecord(User.TestUser.Email);
    await textBox.verifyCurrentAddressRecord(User.TestUser.CurrentAddress);
    await textBox.verifyPermanentAddressRecord(User.TestUser.PermanentAddress);
})