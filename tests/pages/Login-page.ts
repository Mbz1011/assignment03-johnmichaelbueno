import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    //Attributes
    readonly page: Page;
    readonly usernameTextfield: Locator;
    readonly passwordTextfield: Locator;
    readonly loginButton: Locator;

    //Const
    constructor(page: Page) {
        this.page = page;
        this.usernameTextfield = page.locator('input[type="text"]');
        this.passwordTextfield = page.locator('input[type="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    // Methods / functions
    async goTo() {
       await this.page.goto(`${process.env.BASE_URL}login`);
       
    }
    async performLogin(username: string, password: string) {
        //fill out the form - 2 textfields and click the submit button
        await this.usernameTextfield.fill(username);
        await this.passwordTextfield.fill(password);
        await this.loginButton.click();
    }
}