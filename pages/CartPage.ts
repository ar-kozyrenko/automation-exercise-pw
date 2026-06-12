import { Page, Locator } from '@playwright/test'
import { CartTable } from './components/CartTable'

export class CartPage {
    proceedToCheckoutLink: Locator
    emptyCartMessage: Locator
    cartTable: CartTable

    constructor(page: Page) {
        this.proceedToCheckoutLink = page.locator('#cart_items .check_out')
        this.emptyCartMessage = page.locator('#empty_cart')
        this.cartTable = new CartTable(page)
    }

    async clickProceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutLink.click()
    }
}
