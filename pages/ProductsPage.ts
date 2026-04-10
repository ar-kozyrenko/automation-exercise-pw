import { Locator, Page } from '@playwright/test'

export class ProductsPage {
    allProductsTitle: Locator
    firstViewProductLink: Locator

    constructor(page: Page) {
        this.allProductsTitle = page.getByRole('heading', {
            name: 'All Products',
        })
        this.firstViewProductLink = page
            .getByRole('link', {
                name: 'View Product',
            })
            .first()
    }

    async clickFirstViewProductLink(): Promise<void> {
        await this.firstViewProductLink.click()
    }
}
