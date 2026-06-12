import { Page, Locator } from '@playwright/test'
import { TIMEOUT } from 'node:dns'

export class CheckoutModal {
    registerLoginButton: Locator

    constructor(page: Page) {
        this.registerLoginButton = page.getByRole('link', {
            name: 'Register / Login',
        })
    }

    async clickRegisterLoginButton(): Promise<void> {
        await this.registerLoginButton.waitFor({
            state: 'visible',
            timeout: 5000,
        })
        await this.registerLoginButton.click()
    }
}
