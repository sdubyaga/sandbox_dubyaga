import { test } from "@fixtures/page.fixture";
import { User } from '@test-data/users'; 
import { verifyPlaceholder } from '@helpers/inputs.helper';

test('Check Place Holder value on the Text Box page (Elements)', async ({textBox}) => {

    await textBox.open();
    await verifyPlaceholder(textBox.userName,User.Placeholder.FullName);
    await verifyPlaceholder(textBox.email,User.Placeholder.Email);
    await verifyPlaceholder(textBox.currentAddress,User.Placeholder.CurrentAddress);
})