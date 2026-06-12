import { Locator, Page } from '@playwright/test'
import { ProductSection } from './components/ProductsSection'

export class ProductsPage {
    allProductsTitle: Locator
    searchProductInput: Locator
    submitSearchButton: Locator
    productSection: ProductSection

    constructor(page: Page) {
        this.allProductsTitle = page.getByRole('heading', {
            name: 'All Products',
        })
        this.searchProductInput = page.getByPlaceholder('Search Product')
        this.submitSearchButton = page.locator('button[id="submit_search"]')
        this.productSection = new ProductSection(page)
    }

    async clickFirstViewProductLink(): Promise<void> {
        await this.productSection.clickFirstViewProductLink()
    }

    async submitSearch(item: string): Promise<void> {
        await this.searchProductInput.fill(item)
        await this.submitSearchButton.click()
    }

    async getAllProductsNames(): Promise<string[]> {
        return await this.productSection.getAllProductsNames()
    }

    async getProductNameAndPrice(index: number): Promise<{
        name: string
        price: string
    }> {
        return this.productSection.getProductNameAndPrice(index)
    }

    async addProductToCart(index: number): Promise<void> {
        await this.productSection.addProductToCart(index)
    }
}
