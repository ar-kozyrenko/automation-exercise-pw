import { Page, Locator } from '@playwright/test'

export class BasePage {
    page: Page
    continueButton: Locator
    scrollUpButton: Locator

    constructor(page: Page) {
        this.page = page
        this.continueButton = page.getByTestId('continue-button')
        this.scrollUpButton = page.locator('#scrollUp')
    }

    async openPage(url: string): Promise<void> {
        await this.page.goto(url)
    }

    async clickContinueButton(): Promise<void> {
        await this.continueButton.click()
    }

    async scrollToTop(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0, 0)
        })
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight)
        })
    }

    async clickScrollUpButton(): Promise<void> {
        await this.scrollUpButton.click()
    }
}
