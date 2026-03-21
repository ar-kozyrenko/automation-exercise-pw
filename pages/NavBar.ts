import { Page, Locator } from '@playwright/test'

export class NavBar {
    page: Page
    signUpLogInButton: Locator
    deleteAccountButton: Locator

    constructor(page: Page) {
        this.page = page
        this.signUpLogInButton = page.getByRole('link', {
            name: 'Signup / Login',
        })
        this.deleteAccountButton = page.getByRole('link', {
            name: 'Delete Account',
        })
    }

    async clickSignUpLogInButton() {
        await this.signUpLogInButton.click()
    }

    getLoggedInAsUserButton(username: string): Locator {
        return this.page.getByText(`Logged in as ${username}`)
    }
}
