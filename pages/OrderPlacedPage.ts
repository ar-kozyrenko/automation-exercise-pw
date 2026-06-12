import { Locator, Page } from '@playwright/test'

export class OrderPlacedPage {
    orderPlacedHeading: Locator
    orderConfirmedText: Locator
    downloadInvoiceButton: Locator

    constructor(page: Page) {
        this.orderPlacedHeading = page.getByRole('heading', {
            name: 'Order Placed!',
        })
        this.orderConfirmedText = page.getByText(
            'Congratulations! Your order has been confirmed!'
        )
        this.downloadInvoiceButton = page.getByRole('link', {
            name: 'Download Invoice',
        })
    }

    async clickDownloadInvoiceButton(): Promise<void> {
        this.downloadInvoiceButton.click()
    }
}
