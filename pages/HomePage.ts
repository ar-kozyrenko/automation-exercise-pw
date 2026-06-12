import { Page, Locator } from '@playwright/test'
import { ProductSection } from './components/ProductsSection'
import { RecommendedItems } from './components/RecommendedItems'

export class HomePage {
    productSection: ProductSection
    recommendedItems: RecommendedItems
    automationPracticeSubHeading: Locator

    constructor(page: Page) {
        this.productSection = new ProductSection(page)
        this.recommendedItems = new RecommendedItems(page)
        this.automationPracticeSubHeading = page.locator(
            '#slider-carousel .active h2'
        )
    }
}
