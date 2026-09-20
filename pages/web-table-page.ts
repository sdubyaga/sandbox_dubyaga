import { Page, Locator, expect } from '@playwright/test';
import { URLS } from '../test-data/urls';
import { cleanInput, set } from '@helpers/inputs.helper'; 
import { getRandomInt } from '@utils/random'; 
import { BasePage } from './BasePage';

export interface TableRowData  {
    firstName: string;
    lastName: string;
    age: string;
    email: string;
    salary: string;
    department: string;
};

export class WebTablePage extends BasePage {
  
    public firstNameInput: Locator;
    public lastNameInput: Locator;
    public ageInput: Locator;
    public emailInput: Locator;
    public salaryInput: Locator;
    public departmentInput: Locator;
    private buttonSubmit: Locator;
    private buttonEdit: Locator;
    private buttonDelete: Locator;
    private buttonAdd: Locator;
    private comboBoxShow: Locator;
    private tableRows: Locator;

    constructor(page: Page) {
        super(page,URLS.WEB_TABLES);
        this.firstNameInput = this.page.locator('#firstName'); 
        this.lastNameInput = this.page.locator('#lastName');
        this.ageInput = this.page.locator('#age');
        this.emailInput = this.page.locator('#userEmail');
        this.salaryInput = this.page.locator('#salary');
        this.departmentInput = this.page.locator('#department');
        this.tableRows = this.page.getByRole('table').getByRole('row');
        this.buttonAdd = this.page.locator('#addNewRecordButton');
        this.buttonDelete = this.tableRows.locator('[title="Delete"]');
        this.buttonEdit = this.tableRows.locator('[title="Edit"]');
        this.buttonSubmit = this.page.locator('#submit');
        this.comboBoxShow = this.page.getByRole('combobox');
    }

    public async open(): Promise<void> {
        await this.page.goto(URLS.WEB_TABLES);
    }

    async verifyPageIsLoaded(): Promise<void> {
        await expect(this.page.locator('//h1[text()="Web Tables"]')).toBeVisible();
    }
    
    public async clickAddButton(): Promise<void> {
        await this.buttonAdd.click();
    }

    public async clickSubmitButton(): Promise<void> {
        await this.buttonSubmit.click();
    }
   
    public async cleanAllValuesOnRegistationForm(): Promise<void>{
        await cleanInput(this.firstNameInput);
        await cleanInput(this.lastNameInput);
        await cleanInput(this.emailInput);
        await cleanInput(this.ageInput);
        await cleanInput(this.salaryInput);
        await cleanInput(this.departmentInput);
    }

    public async setAllValuesOnRegistrationForm(user: any): Promise<void> {
        await set(this.firstNameInput, user.FirstName);
        await set(this.lastNameInput, user.LastName);
        await set(this.emailInput, user.Email);
        await set(this.ageInput, user.Age);
        await set(this.salaryInput, user.Salary);
        await set(this.departmentInput, user.Department);
    }

    async getRowsCount(): Promise<number> {
        return await this.tableRows.count();
    }
    
    private async getRowData(rowIndex: number): Promise<TableRowData> {
        const row = this.tableRows.nth(rowIndex);
        const cells = row.getByRole('cell');

        return {
            firstName: (await cells.nth(0).innerText()).trim(),
            lastName: (await cells.nth(1).innerText()).trim(),
            age: (await cells.nth(2).innerText()).trim(),
            email: (await cells.nth(3).innerText()).trim(),
            salary: (await cells.nth(4).innerText()).trim(),
            department: (await cells.nth(5).innerText()).trim(),
        };
    }
    
    public async isTableContainsRow(user: any): Promise<void> {
        const expected: TableRowData = {
            firstName: user.FirstName,
            lastName: user.LastName,
            age: user.Age,
            email: user.Email,
            salary: user.Salary,
            department: user.Department
        }
        const rowsCount = await this.getRowsCount();
        let resultVerification: Boolean = false;

        for (let i = 1; i < rowsCount; i++) {
            const actual = await this.getRowData(i);

            const isSameRow =
                actual.firstName === expected.firstName &&
                actual.lastName === expected.lastName &&
                actual.age === expected.age &&
                actual.email === expected.email &&
                actual.salary === expected.salary &&
                actual.department === expected.department;

            if (isSameRow) {
                resultVerification = true;
            }
        }
       expect(resultVerification).toBeTruthy();
    }
      
    async clickEditButtonOnRow(rowIndex: number): Promise<void> {
        await this.tableRows.nth(rowIndex).locator('[title="Edit"]').click();
    }

    async clickEditButtonOnRandomRow(): Promise<void> {
        const rowIndex = getRandomInt(1, (await this.getRowsCount()-1));
        await this.clickEditButtonOnRow(rowIndex);
    }
}