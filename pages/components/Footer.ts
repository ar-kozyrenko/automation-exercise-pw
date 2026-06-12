import { Page, Locator } from '@playwright/test'

export class Footer {
    subscriptionHeading: Locator
    emailInput: Locator
    submitButton: Locator
    successMessage: Locator

    constructor(page: Page) {
        this.subscriptionHeading = page.getByRole('heading', {
            name: 'Subscription',
            exact: true,
        })
        this.emailInput = page.locator('#susbscribe_email')
        this.submitButton = page.locator('button[id = subscribe]')
        this.successMessage = page.locator('#success-subscribe')
    }

    async submitSubscriptionRequest(email: string): Promise<void> {
        await this.emailInput.fill(email)
        await this.submitButton.click()
    }
}
