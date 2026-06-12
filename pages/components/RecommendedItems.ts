import { Page, Locator } from '@playwright/test'

export class RecommendedItems {
    carousel: Locator
    title: Locator

    constructor(page: Page) {
        this.carousel = page.locator(
            '.recommended_items #recommended-item-carousel'
        )
        this.title = page.getByRole('heading', { name: 'recommended items' })
    }

    activeItems(): Locator {
        const active = this.carousel.locator('.item.active .productinfo')
        return active
    }

    async addToCartFirstRecommendedProduct(): Promise<void> {
        await this.activeItems().locator('.add-to-cart').first().click()
    }

    async getFirstRecommendedProductName(): Promise<string> {
        const name = await this.activeItems().locator('p').first().textContent()
        return name?.trim() ?? ''
    }

    async getFirstRecommendedProductPrice(): Promise<string> {
        const name = await this.activeItems()
            .locator('h2')
            .first()
            .textContent()
        return name?.trim() ?? ''
    }
}
