import { Page, Locator } from '@playwright/test'

export class CartTable {
    page: Page
    rows: Locator
    constructor(page: Page) {
        this.page = page
        this.rows = page.locator('#cart_info tbody tr')
    }

    async getProductNamePriceQtyTotalPrice(index: number): Promise<{
        name: string
        price: string
        quantity: string
        total: string
    }> {
        const row = this.rows.nth(index)

        const name = await row.locator('.cart_description h4').textContent()
        const price = await row.locator('.cart_price p').textContent()
        const quantity = await row
            .locator('.cart_quantity button')
            .textContent()
        const total = await row.locator('.cart_total p').textContent()
        return {
            name: name?.trim() ?? '',
            price: price?.trim() ?? '',
            quantity: quantity?.trim() ?? '',
            total: total?.trim() ?? '',
        }
    }

    async getAllProductsNames(): Promise<string[]> {
        const names = await this.rows
            .locator('.cart_description h4')
            .allTextContents()
        return names
    }

    async removeProduct(index: number): Promise<void> {
        const row = this.rows.nth(index)
        const xButton = row.locator('.cart_quantity_delete')
        await xButton.click()
    }
}
