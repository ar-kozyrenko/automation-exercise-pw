import { Locator, Page } from '@playwright/test'

export class CategoryPage {
    page: Page
    title: Locator

    constructor(page: Page) {
        this.page = page
        this.title = page.locator('h2.title')
    }
}
