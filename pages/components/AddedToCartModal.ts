import { Locator, Page } from '@playwright/test'

export class AddedToCartModal {
    continueShoppingButton: Locator
    viewCartButton: Locator

    constructor(page: Page) {
        this.continueShoppingButton = page.getByRole('button', {
            name: 'Continue Shopping',
        })
        this.viewCartButton = page.getByRole('link', { name: 'View Cart' })
    }

    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click()
    }
    async clickViewCartButton() {
        await this.viewCartButton.click()
    }
}
