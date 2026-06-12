import { Locator, Page } from '@playwright/test'

export class ProductSection {
    firstViewProductLink: Locator
    viewProductLink: Locator
    productsNames: Locator
    productCards: Locator

    constructor(page: Page) {
        this.productCards = page.locator('.product-image-wrapper')
        this.firstViewProductLink = page
            .getByRole('link', {
                name: 'View Product',
            })
            .first()

        this.viewProductLink = page.getByRole('link', {
            name: 'View Product',
        })

        this.productsNames = page.locator('.productinfo p')
    }

    async clickFirstViewProductLink(): Promise<void> {
        await this.firstViewProductLink.click()
    }

    async clickViewProductLink(index: number): Promise<void> {
        const card = this.productCards.nth(index)
        await card.getByRole('link', { name: 'View Product' }).click()
    }

    async getAllProductsNames(): Promise<string[]> {
        return this.productsNames.allTextContents()
    }
    async addProductToCart(index: number): Promise<void> {
        const card = this.productCards.nth(index)
        const addToCartButton = card.locator('.productinfo .add-to-cart')
        await addToCartButton.click()
    }

    async getProductNameAndPrice(
        index: number
    ): Promise<{ name: string; price: string }> {
        const card = this.productCards.nth(index)
        const name = await card.locator('p').first().textContent()
        const price = await card.locator('h2').first().textContent()
        return { name: name?.trim() ?? '', price: price?.trim() ?? '' }
    }
}
