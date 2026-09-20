import { Locator, Page, expect } from "@playwright/test";
import { URLS } from "@test-data/urls";
import { checkIsBorderColorRed, set, cleanInput } from "@helpers/inputs.helper";
import { BasePage } from "./BasePage";

export interface StudentUser {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobile: string;
    date_of_birth: string;
    subject: string;
    hobby: string;
    current_address: string;
    state: string;
    city: string;
}

export class PracticeForm extends BasePage {
    private firstName: Locator;
    private lastName: Locator;
    private email: Locator;
    private genderMale: Locator;
    private genderFemale: Locator;
    private genderOther: Locator;
    private mobile: Locator;
    private date_of_birth: Locator;
    private subject: Locator;
    private hobbySport: Locator;
    private hobbyReading: Locator;
    private hobbyMusic: Locator;
    private current_address: Locator;
    private state: Locator;
    private city: Locator;
    private buttonUploadPicture: Locator;
    private buttonSubmit: Locator;

    constructor (page: Page) {
        super(page,URLS.PRACTICE_FORM);
        this.firstName = this.page.locator("//label[text()='Name']/following::input[@id='firstName'][1]");
        this.lastName = this.page.locator("//label[text()='Name']/following::input[@id='lastName'][1]");
        this.email = this.page.locator("//input[@id='userEmail']");
        this.genderMale = this.page.locator("//label[@for='gender-radio-1']");
        this.genderFemale = this.page.locator("//label[@for='gender-radio-2']");
        this.genderOther = this.page.locator("//label[@for='gender-radio-3']");
        this.mobile = this.page.locator("//input[@id='userNumber']");
        this.date_of_birth = this.page.locator("//input[@id='dateOfBirthInput']");
        this.subject = this.page.locator("//input[@id='subjectsInput']");
        this.hobbySport = this.page.locator("//label[@for='hobbies-checkbox-1']");
        this.hobbyReading = this.page.locator("//label[@for='hobbies-checkbox-2']");
        this.hobbyMusic = this.page.locator("//label[@for='hobbies-checkbox-3']");
        this.current_address = this.page.locator("//textarea[@id='currentAddress']");
        this.state = this.page.locator("//div[@id='state']");
        this.city = this.page.locator("//div[@id='city']");
        this.buttonUploadPicture = this.page.locator("//input[@id='uploadPicture']");
        this.buttonSubmit = this.page.locator("//button[@id='submit']");
    }

    async open(): Promise<void>{
        await this.page.goto(URLS.PRACTICE_FORM);
    }

    async verifyPageIsLoaded(): Promise<void> {
            await expect(this.page.locator('//h1[text()="Practice Form"]')).toBeVisible();
    }

    async selectGender (gender: String): Promise <void>{
        if (gender == 'male') await this.genderMale.click();
        if (gender == 'female') await this.genderFemale.click();
        if (gender == 'other') await this.genderOther.click();
    }    

    async selectHobby (hobby: String): Promise <void>{
        if (hobby == 'sport') await this.hobbySport.click();
        if (hobby == 'reading') await this.hobbyReading.click();
        if (hobby == 'music') await this.hobbyMusic.click();
    }

    async fillForm (user: StudentUser): Promise<void>{
        await set(this.firstName, user.firstName);
        await set(this.lastName, user.lastName);
        await set(this.email, user.email);
        await this.selectGender(user.gender);
        await set(this.mobile, user.mobile);
        await set(this.date_of_birth, user.date_of_birth);
        await this.date_of_birth.press('Escape');
        await set(this.subject, user.subject);
        await this.selectHobby(user.hobby);
        await set(this.current_address, user.current_address);
        await this.state.click();
        await this.page.locator(`//div[text()='${user.state}']`).click();
        await this.city.click();
        await this.page.locator(`//div[text()='${user.city}']`).click();
    }

    async clickSubmitButton (): Promise<void>{
        await this.buttonSubmit.click();
    }

}