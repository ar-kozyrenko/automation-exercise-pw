import { Locator, Page } from '@playwright/test'
import { ProductSection } from './components/ProductsSection'

export class BrandPage {
    page: Page
    title: Locator
    productSection: ProductSection

    constructor(page: Page) {
        this.page = page
        this.title = page.locator('h2.title')
        this.productSection = new ProductSection(page)
    }
}
