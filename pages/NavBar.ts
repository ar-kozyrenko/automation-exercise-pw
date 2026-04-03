import { Page, Locator } from '@playwright/test'

export class NavBar {
    page: Page
    signUpLogInButton: Locator
    deleteAccountButton: Locator
    logOutButton: Locator
    contactUsButton: Locator

    constructor(page: Page) {
        this.page = page
        this.signUpLogInButton = page.getByRole('link', {
            name: 'Signup / Login',
        })
        this.deleteAccountButton = page.getByRole('link', {
            name: 'Delete Account',
        })
        this.logOutButton = page.getByRole('link', { name: 'Logout' })
        this.contactUsButton = page.getByRole('link', { name: 'Contact us' })
    }

    async clickSignUpLogInButton(): Promise<void> {
        await this.signUpLogInButton.click()
    }
    async clickDeleteAccountButton(): Promise<void> {
        await this.deleteAccountButton.click()
    }

    getLoggedInAsUserButton(username: string): Locator {
        return this.page.getByText(`Logged in as ${username}`)
    }

    async clickLogOutButton(): Promise<void> {
        await this.logOutButton.click()
    }
    async clickContactUsButton(): Promise<void> {
        await this.contactUsButton.click()
    }
}
