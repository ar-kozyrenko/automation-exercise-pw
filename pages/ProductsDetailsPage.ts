import { Locator, Page } from '@playwright/test'

export class ProductsDetailsPage {
    productInfoBlock: Locator
    productName: Locator

    constructor(page: Page) {
        this.productInfoBlock = page.locator('.product-information')
        this.productName = this.productInfoBlock.locator('h2')
    }
}
