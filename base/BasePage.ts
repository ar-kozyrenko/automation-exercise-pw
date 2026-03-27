import { Page, Locator } from '@playwright/test'

export class BasePage {
    page: Page
    continueButton: Locator

    constructor(page: Page) {
        this.page = page
        this.continueButton = page.getByTestId('continue-button')
    }

    async openPage(url: string) {
        await this.page.goto(url)
    }

    async clickContinueButton() {
        await this.continueButton.click()
    }
}
