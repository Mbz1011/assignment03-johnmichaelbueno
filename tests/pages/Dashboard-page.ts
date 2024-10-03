import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
    //Attributes
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly ViewRoomButton: Locator;
    readonly ViewClientButton: Locator;
    readonly ViewReservationButton: Locator;
    readonly ViewBillsButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.ViewRoomButton = page
            .locator('div', { hasText: /^RoomsNumber: 2View$/ })
            .getByRole('link');

        this.ViewClientButton = page.
            locator('div', { hasText: /^ClientsNumber: 2View$/ })
            .getByRole('link');


        this.ViewReservationButton = page.
            locator('div', { hasText: /^ReservationsTotal: 1Current: 0View$/ })
            .getByRole('link');

        this.ViewBillsButton = page.
            locator('div', { hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ })
            .getByRole('link');


    }

    async performLogout() {
        await this.logoutButton.click();

    }
    async performOpenRoom() {
        await this.ViewRoomButton.click();

    }
    async performOpenClient() {
        await this.ViewClientButton.click();
    }

    async performReservationOpenClient() {
        await this.ViewReservationButton.click();
    }
    async performOpenBills() {
        await this.ViewBillsButton.click();

    }


}
