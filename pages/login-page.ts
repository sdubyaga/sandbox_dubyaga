import { Page, Locator, expect } from "@playwright/test";
import { URLS } from "@test-data/urls";
import { checkIsBorderColorRed, set, cleanInput } from "@helpers/inputs.helper";
import { BasePage } from "./BasePage";
import { User } from "@test-data/users";

export interface LoginUser {
    userName: string;
    password: string;
}

export class Login extends BasePage {
    public loginUserName: Locator;
    public loginPassword: Locator;
    private registerFirstName: Locator;
    private registerLastName: Locator;
    private registerUserName: Locator;
    private registerPassword: Locator;
    private buttonNewUser: Locator;
    private buttonLogin: Locator;
    private buttonRegister: Locator;
    private buttonBackToLogin: Locator;
    private buttonLogout: Locator;
    private buttonGoToBookStore: Locator;
    private buttonDeleteAccount: Locator;
    private buttonDeleteAllBooks: Locator;
    private profileUserName: Locator;
    private buttonConfirmationOK: Locator;
    private buttonConfirmationCancel: Locator;
    
    constructor (page: Page) {
        super(page,URLS.LOGIN);    
        this.loginUserName = this.page.locator('#userName');
        this.loginPassword = this.page.locator('#password');
        this.registerFirstName = this.page.locator('#firstname');
        this.registerLastName = this.page.locator('#lastname');
        this.registerUserName = this.page.locator('#userName');
        this.registerPassword = this.page.locator('#password');
        this.buttonLogin= this.page.getByRole("button", { name: 'login'});
        this.buttonNewUser = this.page.getByRole("button", { name: 'New User'});
        this.buttonBackToLogin = this.page.getByRole("button", { name: 'Back to Login'});
        this.buttonRegister = this.page.getByRole("button", { name: 'Register'});
        this.buttonLogout = this.page.getByRole("button", { name: 'Logout'});
        this.buttonGoToBookStore = this.page.getByRole("button", { name: 'Go To Book Store'});
        this.buttonDeleteAccount = this.page.getByRole("button", { name: 'Delete Account'});
        this.buttonDeleteAllBooks = this.page.getByRole("button", { name: 'Delete All Books'});
        this.profileUserName = this.page.locator('#userName-value');
        this.buttonConfirmationOK = this.page.getByRole('button', { name: 'OK', exact: true });
    }

    public async open(): Promise<void> {
        await this.page.goto(URLS.LOGIN);
    }

    async verifyPageIsLoaded(): Promise<void> {
            await expect(this.page.locator('//h1[text()="Login"]')).toBeVisible();
    }

    async verifyRegisterPageIsLoaded(): Promise<void> {
            await expect(this.page.locator('//h1[text()="Register"]')).toBeVisible();
    }

    async verifyLoginPageIsLoaded(): Promise<void> {
        await expect(this.page.locator('#userName')).toBeVisible();
    }

    async verifyProfilePageIsLoaded(): Promise<void> {
        await expect(this.page.getByRole("button",{ name: 'Logout'})).toBeVisible();
    }
    
    public async clickNewUser(): Promise<void> {
        await this.buttonNewUser.click();
        await this.verifyRegisterPageIsLoaded();
    }

    public async fillRegisterForm(userData: LoginUser): Promise<void> {
        await set(this.registerFirstName, User.TestUser.FirstName);
        await set(this.registerLastName, User.TestUser.LastName);
        await set(this.registerUserName, userData.userName);
        await set(this.registerPassword, userData.password);
    }

    public async clickRegisterButton(): Promise<void> {
        await this.buttonRegister.click();
        await this.verifyProfilePageIsLoaded();
    }

    public async enterUserCredential(userData: LoginUser): Promise<void> {
        await set(this.loginUserName,userData.userName);
        await set(this.loginPassword, userData.password);
    }

    public async loginAs(userData: LoginUser): Promise<void> {
        await this.open();
        await this.enterUserCredential(userData);
        await this.clickLoginButton();
    }

    public async clickLoginButton(): Promise<void> {
        await this.buttonLogin.click();
    }

    public async clickLogOutButton(): Promise<void> {
        await this.buttonLogout.click();
        await this.verifyLoginPageIsLoaded();
    }

    public async clickDeleteAccount(): Promise<void> {
        await this.buttonDeleteAccount.click();
    }

    public async deleteAccountAndConfirm(): Promise<void> {
        await this.clickDeleteAccount();
        await this.clickConfirmationOkButton();
    }

    public async clickBackToLogin(): Promise<void> {
        await this.buttonBackToLogin.click();
        await this.verifyLoginPageIsLoaded();
    }

    public async clickConfirmationOkButton(): Promise<void> {
        await this.buttonConfirmationOK.click();
    }

    public async checkProfilePageUser(profileName: LoginUser): Promise<void> {
        await this.verifyProfilePageIsLoaded();
        let userName = await this.profileUserName.innerText();
        expect(userName).toBe(profileName.userName);
    }

    public async chechIsUserNameBorderRed  (): Promise<void> {
        await checkIsBorderColorRed(this.loginUserName);
    }

    public async chechIsPasswordBorderRed  (): Promise<void> {
        await checkIsBorderColorRed(this.loginPassword);
    }

    public async expectUserNameRequiredError(): Promise<void> {
        await this.clickLoginButton();
        await this.chechIsUserNameBorderRed();
    }

    public async expectPasswordRequiredError(): Promise<void> {
        await this.clickLoginButton();
        await this.chechIsPasswordBorderRed();
    }

    public async enterUserName (user: LoginUser): Promise<void> {
        await this.cleanUserName();
        await set((this.loginUserName),user.userName);
    }

    public async enterPassword (user: LoginUser): Promise<void> {
        await this.cleanPassword();
        await set((this.loginPassword),user.password);
    }

    public async cleanUserName (): Promise<void> {
        await cleanInput(this.loginUserName);
    }

    public async cleanPassword (): Promise<void> {
        await cleanInput(this.loginPassword);
    }
}