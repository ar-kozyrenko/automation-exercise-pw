import { Page, Locator } from '@playwright/test'

export class DeleteAccountPage {
    acountDeletedHeading: Locator

    constructor(page: Page) {
        this.acountDeletedHeading = page.getByTestId('account-deleted')
    }
}
