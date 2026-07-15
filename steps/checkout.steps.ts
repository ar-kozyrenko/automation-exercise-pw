import { Page, expect } from '@playwright/test'
import { PageManager } from '../base/PageManager'
import { PaymentFormData, RegistrationFormData } from '../types/forms'

export async function assertCheckoutHeadingsVisible(
    pageManager: PageManager
): Promise<void> {
    await expect(pageManager.checkoutPage.addressDetailsHeading).toBeVisible()
    await expect(
        pageManager.checkoutPage.yourDeliveryAddressHeading
    ).toBeVisible()
    await expect(
        pageManager.checkoutPage.yourBillingAddressHeading
    ).toBeVisible()
}

export async function assertAddressesMatch(
    pageManager: PageManager,
    registrationData: RegistrationFormData
): Promise<void> {
    await pageManager.checkoutPage.assertDeliveryAddressContains(
        registrationData
    )
    await pageManager.checkoutPage.assertBillingAddressContains(
        registrationData
    )
}

export async function assertCartProductMatches(
    pageManager: PageManager,
    addedProduct: { name: string; price: string },
    expectedTotal: string
): Promise<void> {
    const cartProduct =
        await pageManager.checkoutPage.cartTable.getProductNamePriceQtyTotalPrice(
            0
        )
    expect(cartProduct).toMatchObject({
        name: addedProduct.name,
        price: addedProduct.price,
        quantity: '1',
        total: expectedTotal,
    })
}

export async function placeOrderAndVerifyPayment(
    pageManager: PageManager,
    page: Page,
    comment: string,
    paymentData: PaymentFormData
): Promise<void> {
    await pageManager.checkoutPage.addComment(comment)
    await expect(pageManager.checkoutPage.commentField).toHaveValue(comment)
    await pageManager.checkoutPage.clickPlaceOrder()
    await pageManager.paymentPage.fillPaymentForm(paymentData)
    await pageManager.paymentPage.clickPayAndConfirmButton()
    await expect(pageManager.orderPlacedPage.orderPlacedHeading).toBeVisible()
    await expect(pageManager.orderPlacedPage.orderConfirmedText).toBeVisible()
    await expect(page).toHaveURL(/\/payment_done\/\d+$/)
}
