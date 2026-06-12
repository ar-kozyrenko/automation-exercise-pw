import { Page, Locator } from '@playwright/test'
import { PaymentFormData } from '../types/forms'

export class PaymentPage {
    nameOnCardInput: Locator
    cardNumberInput: Locator
    cvcInput: Locator
    expirationMonthInput: Locator
    expirationYearInput: Locator
    payAndConfirmButton: Locator

    constructor(page: Page) {
        this.nameOnCardInput = page.getByTestId('name-on-card')
        this.cardNumberInput = page.getByTestId('card-number')
        this.cvcInput = page.getByTestId('cvc')
        this.expirationMonthInput = page.getByTestId('expiry-month')
        this.expirationYearInput = page.getByTestId('expiry-year')
        this.payAndConfirmButton = page.getByTestId('pay-button')
    }

    async fillNameOnCard(name: string): Promise<void> {
        await this.nameOnCardInput.fill(name)
    }

    async fillCardNumber(cardNumber: string): Promise<void> {
        await this.cardNumberInput.fill(cardNumber)
    }
    async fillCvc(cvc: string): Promise<void> {
        await this.cvcInput.fill(cvc)
    }
    async fillExpirationMonth(month: string): Promise<void> {
        await this.expirationMonthInput.fill(month)
    }

    async fillExpirationYear(year: string): Promise<void> {
        await this.expirationYearInput.fill(year)
    }
    async fillPaymentForm(cardData: PaymentFormData): Promise<void> {
        await this.fillNameOnCard(cardData.nameOnCard)
        await this.fillCardNumber(cardData.cardNumber)
        await this.fillCvc(cardData.cvc)
        await this.fillExpirationMonth(cardData.expiration.month)
        await this.fillExpirationYear(cardData.expiration.year)
    }
    async clickPayAndConfirmButton(): Promise<void> {
        await this.payAndConfirmButton.click()
    }
}
