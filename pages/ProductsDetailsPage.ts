import { Locator, Page } from '@playwright/test'

export class ProductsDetailsPage {
    productInfoBlock: Locator
    productName: Locator
    category: Locator
    price: Locator
    availability: Locator
    condition: Locator
    brand: Locator
    quantityInput: Locator
    addToCartButton: Locator
    writeReviewTab: Locator
    yourNameInput: Locator
    emailInput: Locator
    addReviewInput: Locator
    submitButton: Locator
    reviewSuccessMessage: Locator

    constructor(page: Page) {
        this.productInfoBlock = page.locator('.product-information')
        this.productName = this.productInfoBlock.locator('h2')
        this.category = this.productInfoBlock
            .locator('p')
            .filter({ hasText: 'Category:' })
        this.price = this.productInfoBlock.filter({ hasText: 'Rs.' })
        this.availability = this.productInfoBlock
            .locator('p')
            .filter({ hasText: 'Availability:' })
        this.condition = this.productInfoBlock
            .locator('p')
            .filter({ hasText: 'Condition:' })
        this.brand = this.productInfoBlock
            .locator('p')
            .filter({ hasText: 'Brand:' })
        this.quantityInput = page.locator('#quantity')
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' })
        this.writeReviewTab = page.getByText('Write Your Review')
        this.emailInput = page.locator('input#email')
        this.yourNameInput = page.locator('input#name')
        this.addReviewInput = page.locator('textarea#review')
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.reviewSuccessMessage = page.getByText('Thank you for your review.')
    }
    async fillQuantity(quantity: number): Promise<void> {
        await this.quantityInput.fill(quantity.toString())
    }

    async clickAddToCartButton(): Promise<void> {
        await this.addToCartButton.click()
    }
    async getDetailsValueByLabel(label: string): Promise<string> {
        const text = await this.productInfoBlock
            .locator('p')
            .filter({ hasText: label })
            .textContent()
        return text?.replace(label, '').replace(':', '').trim() || ''
    }
    async fillYourName(name: string): Promise<void> {
        await this.yourNameInput.fill(name)
    }
    async fillEmailAddress(email: string): Promise<void> {
        await this.emailInput.fill(email)
    }
    async fillAddReview(review: string): Promise<void> {
        await this.addReviewInput.fill(review)
    }
    async clickSubmitReview(): Promise<void> {
        await this.submitButton.click()
    }
}
