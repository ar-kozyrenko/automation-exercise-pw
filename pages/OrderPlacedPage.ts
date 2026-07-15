import { Download, Locator, Page } from '@playwright/test'

export class OrderPlacedPage {
    private readonly page: Page
    orderPlacedHeading: Locator
    orderConfirmedText: Locator
    downloadInvoiceButton: Locator

    constructor(page: Page) {
        this.page = page
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
        await this.downloadInvoiceButton.click()
    }

    /**
     * Clicks "Download Invoice" and resolves with the triggered download.
     *
     * WebKit on CI (headless, against the live third-party site) is markedly
     * slower to emit the `download` event than Chromium. To keep this robust:
     *  - wait for the link to be actionable before clicking;
     *  - arm the `download` listener *before* the click so the event is never
     *    missed;
     *  - bound the wait with an explicit timeout so a genuine hang fails fast
     *    with a specific "download event" message instead of surfacing as an
     *    opaque overall test timeout.
     */
    async downloadInvoice(timeout = 30_000): Promise<Download> {
        await this.downloadInvoiceButton.waitFor({ state: 'visible' })
        const downloadPromise = this.page.waitForEvent('download', { timeout })
        await this.downloadInvoiceButton.click()
        return downloadPromise
    }
}
