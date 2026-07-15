import { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { RegistrationFormData } from '../types/forms'
import { CartTable } from './components/CartTable'

export class CheckoutPage {
    addressDetailsHeading: Locator
    yourDeliveryAddressHeading: Locator
    yourBillingAddressHeading: Locator
    deliveryAddressBlock: Locator
    billingAddressBlock: Locator
    cartTable: CartTable
    commentField: Locator
    placeOrderLink: Locator

    constructor(page: Page) {
        this.addressDetailsHeading = page.getByRole('heading', {
            name: 'Address Details',
        })
        this.yourDeliveryAddressHeading = page.getByRole('heading', {
            name: 'Your delivery address',
        })
        this.yourBillingAddressHeading = page.getByRole('heading', {
            name: 'Your billing address',
        })
        this.deliveryAddressBlock = page.locator('#address_delivery')
        this.billingAddressBlock = page.locator('#address_invoice')
        this.commentField = page.locator('textarea.form-control')
        this.placeOrderLink = page.getByRole('link', { name: 'Place Order' })
        this.cartTable = new CartTable(page)
    }
    async assertAddressContains(
        addressBlock: Locator,
        data: RegistrationFormData
    ): Promise<void> {
        await expect(addressBlock).toContainText(data.firstName)
        await expect(addressBlock).toContainText(data.lastName)
        if (data.company) {
            await expect(addressBlock).toContainText(data.company)
        }
        await expect(addressBlock).toContainText(data.address)
        if (data.address2) {
            await expect(addressBlock).toContainText(data.address2)
        }
        await expect(addressBlock).toContainText(data.city)
        await expect(addressBlock).toContainText(data.state)
        await expect(addressBlock).toContainText(data.zipCode)
        await expect(addressBlock).toContainText(data.country)
        await expect(addressBlock).toContainText(data.mobileNumber)
    }
    async assertDeliveryAddressContains(data: RegistrationFormData) {
        await this.assertAddressContains(this.deliveryAddressBlock, data)
    }
    async assertBillingAddressContains(data: RegistrationFormData) {
        await this.assertAddressContains(this.billingAddressBlock, data)
    }

    async addComment(text: string): Promise<void> {
        await this.commentField.fill(text)
    }

    async clickPlaceOrder(): Promise<void> {
        await this.placeOrderLink.click()
    }
}
