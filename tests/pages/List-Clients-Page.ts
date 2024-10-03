import { expect, type Locator, type Page } from '@playwright/test';

export class ListClientsPage {

    readonly CreateClientButton: Locator;
    readonly page: Page;  // Declare the page attribute
    readonly editClientButton: Locator;
    readonly ActionEdit: Locator;
    readonly headingLocator: Locator;
    readonly BackButton: Locator;
    readonly SaveButton: Locator;
    readonly ClientsName: Locator;
    readonly DeleteButton: Locator;
    readonly ActionDelete: Locator;




    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.CreateClientButton = page.getByRole('link', { name: 'Create Client' });
        this.editClientButton = page.locator('#app > div > div.clients > div > div.menu > a:nth-child(1)');
        this.ActionEdit = page.locator('.action').first();
        this.headingLocator = page.locator('role=heading[name="Mikael Eriksson: 2020-04-01 -"]');
        this.ClientsName = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.BackButton = page.getByRole('link', { name: 'Back' });
        this.SaveButton = page.locator('a.btn.blue', { hasText: 'Save' });
        this.DeleteButton = page.locator('#app > div > div.clients > div > div.menu > a:nth-child(2)');
        this.ActionDelete = page.locator('.action').nth(1);

    }

    // Click the "Create Client" button
    async clickCreateClientButton() {
        // Ensure the "Create Client" button is visible before clicking
        await expect(this.CreateClientButton).toBeVisible();
        await this.CreateClientButton.click();
    }


    async editClient() {
        await this.ActionEdit.click();
        await this.editClientButton.click();
        await this.ClientsName.fill("John")
        await this.SaveButton.click();

    }


    // CreateReservation method
    async deleteClients() {

        await this.ActionDelete.click();
        await this.DeleteButton.click();
        await expect(this.headingLocator).not.toBeVisible();

    }

    async performBackToList() {

        await this.BackButton.click();

    }
}

