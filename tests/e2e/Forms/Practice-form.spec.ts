import { StudentUser } from "@pages/practice-form";
import { test } from "@fixtures/page.fixture";
import { User } from "@test-data/users";

test('Fill out Student Registration Form', async ({practiceForm}) => {
    let testUser: StudentUser;
    testUser = {
            firstName:  User.TestUser.FirstName,
            lastName: User.TestUser.LastName,
            email: User.TestUser.Email,
            gender: User.TestUser.Gender,
            mobile: User.TestUser.Mobile,
            date_of_birth: User.TestUser.BirthDate,
            subject: User.TestUser.Subject, 
            hobby: User.TestUser.Hobbies,
            current_address: User.TestUser.CurrentAddress,
            state: User.TestUser.State,
            city: User.TestUser.City
    }

    await practiceForm.open();
    await practiceForm.fillForm(testUser);
    await practiceForm.clickSubmitButton();
})        