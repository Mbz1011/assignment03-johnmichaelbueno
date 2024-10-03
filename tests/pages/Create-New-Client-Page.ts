import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
export class CreateClientPage {
    // Attributes
    readonly page: Page;
    readonly ClientName: Locator;
    readonly Email: Locator;
    readonly Telephone: Locator;
    readonly SaveClientButton: Locator;


    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.ClientName = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.Email = page.locator('input[type="email"]');
        this.Telephone = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.SaveClientButton = page.getByText('Save');
    }


    // CreateClient method
    async createClient(clientName: string, clientEmail: string, clientTelephone: string) {
        clientName = faker.person.fullName();
        clientEmail = faker.internet.email();
        clientTelephone = faker.phone.number();
        await this.ClientName.fill(clientName);
        await this.Email.fill(clientEmail);
        await this.Telephone.fill(clientTelephone);
        await this.SaveClientButton.click();
    }
}