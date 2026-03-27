import { Page, Locator } from '@playwright/test'

export class DeleteAccountPage {
    accountDeletedHeading: Locator

    constructor(page: Page) {
        this.accountDeletedHeading = page.getByTestId('account-deleted')
    }
}
