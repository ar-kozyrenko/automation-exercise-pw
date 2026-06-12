import { Page, Locator } from '@playwright/test'

export class NavBar {
    page: Page
    signUpLogInButton: Locator
    deleteAccountButton: Locator
    logOutButton: Locator
    contactUsButton: Locator
    testCasesButton: Locator
    productsButton: Locator
    cartButton: Locator

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
        this.testCasesButton = page
            .locator('#header')
            .getByRole('link', { name: 'Test Cases' })
        this.productsButton = page.getByRole('link', { name: 'Products' })
        // this.cartButton = page.getByRole('link', {
        //     name: 'Cart',
        //     exact: true,
        //})

        this.cartButton = page.locator('.navbar-nav a[href="/view_cart"]')
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
    async clickTestCasesButton(): Promise<void> {
        await this.testCasesButton.click()
    }
    async clickProductsButton(): Promise<void> {
        await this.productsButton.click()
    }
    async clickCartButton(): Promise<void> {
        await this.cartButton.waitFor({ state: 'visible', timeout: 5000 })
        await this.cartButton.click()
    }
}
