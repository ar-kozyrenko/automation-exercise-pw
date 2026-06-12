import { Page, Locator } from '@playwright/test'

export class SideBar {
    page: Page
    categoryHeading: Locator
    categoryBlock: Locator

    brandsHeading: Locator
    brandsBlock: Locator

    constructor(page: Page) {
        this.page = page
        this.categoryHeading = page.getByRole('heading', { name: 'Category' })
        this.categoryBlock = page.locator('.category-products')

        this.brandsHeading = page.getByRole('heading', { name: 'Brands' })
        this.brandsBlock = page.locator('.brands-name')
    }

    categoryButton(category: string): Locator {
        return this.categoryBlock.locator(`a[href='#${category}']`)
    }
    async openCategory(category: string): Promise<void> {
        await this.categoryButton(category).click()
    }

    async clickSubcategory(
        category: string,
        subcategory: string
    ): Promise<void> {
        await this.page
            .locator(`#${category}`)
            .getByRole('link', { name: `${subcategory}` })
            .click()
    }

    brandButton(brand: string): Locator {
        return this.brandsBlock.locator(`a[href='/brand_products/${brand}']`)
    }
    async clickBrandTitle(brand: string): Promise<void> {
        this.brandButton(brand).click()
    }
}
