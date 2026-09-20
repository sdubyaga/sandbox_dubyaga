import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../test-data/urls';
import { BasePage } from './BasePage';

export class TextBoxPage extends BasePage {

    public userName: Locator;
    public email: Locator;
    public currentAddress: Locator;
    private permanentAddress: Locator;
    private userNameRecord: Locator;
    private emailRecord: Locator;
    private curAddressRecord: Locator;  
    private perAddressRecord: Locator;
    private buttonSubmit: Locator;
    
    constructor(page: Page) {
        super(page,URLS.TEXT_BOX);
        this.userName = this.page.locator('#userName');
        this.email = this.page.locator('#userEmail');
        this.currentAddress = this.page.locator('#currentAddress');
        this.permanentAddress = this.page.locator('#permanentAddress');
        this.userNameRecord = this.page.locator('#name');
        this.emailRecord = this.page.locator('#email');
        this.curAddressRecord = this.page.locator('#currentAddress').nth(1);
        this.perAddressRecord = this.page.locator('#permanentAddress').nth(1);
        this.buttonSubmit = this.page.locator('#submit');
    }
  
  async verifyPageIsLoaded(): Promise<void> {
        await expect(this.page.locator('//h1[text()="Text Box"]')).toBeVisible();
    }
  
    public async open() {
    await this.page.goto(URLS.TEXT_BOX);
  }
  
  public async setFullName(name: string) {
    await this.userName.fill(name);
  }

  public async setEmail(email: string) {
    await this.email.fill(email); 
  }

  public async setCurrentAddress(address: string) {
    await this.currentAddress.fill(address);
  }

  public async setPermanentAddress(address: string) {
    await this.permanentAddress.fill(address);
  }
  
  public async getFullName(): Promise<string> {
    return await this.userName.inputValue();
  }

  public async getEmail(): Promise<string> {
    return await this.email.inputValue();
  }
  
  public async getCurrentAddress(): Promise<string> {
    return await this.currentAddress.inputValue();
  }

  public async getPermanentAddress(): Promise<string> {
    return await this.permanentAddress.inputValue();
  }

  public async verifyFullNamePlaceholder(expectedPlaceHolder: string): Promise<void> {
    await expect(this.userName).toHaveAttribute('placeholder',expectedPlaceHolder);
  }

  public async verifyEmailPlaceholder(expectedPlaceHolder: string): Promise<void> {
    await expect(this.email).toHaveAttribute('placeholder',expectedPlaceHolder);
  }   

  public async verifyCurrentAddressPlaceholder(expectedPlaceHolder: string): Promise<void> {
    await expect (this.currentAddress).toHaveAttribute('placeholder',expectedPlaceHolder);
  }

  public async clickSubmitButton(): Promise<void> {
    await this.buttonSubmit.click();
  }

  public async verifyFullNameRecord(nameEntered: string): Promise<void> {
    await expect(this.userNameRecord).toHaveText(`Name:${nameEntered}`);}

  public async verifyEmailRecord(emailEntered: string): Promise<void> {
    await expect(this.emailRecord).toHaveText(`Email:${emailEntered}`);}   
  
  public async verifyCurrentAddressRecord(curAddressEntered: string): Promise<void> {
    await expect(this.curAddressRecord).toHaveText(`Current Address :${curAddressEntered}`);}

  public async verifyPermanentAddressRecord(perAddressEntered: string): Promise<void> {
    await expect(this.perAddressRecord).toHaveText(`Permananet Address :${perAddressEntered}`);} 

}    