import { Locator, Page } from '@playwright/test'

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
     * Retrieves the invoice by requesting the "Download Invoice" link's target
     * through the page's request context, rather than relying on a browser
     * `download` event.
     *
     * WebKit headless on CI never emits the `download` event for this link
     * (deterministic across retries), while Chromium does — so an event-based
     * approach is inherently browser-dependent. `page.request` shares the
     * page's cookies/session, so fetching the link's href returns the exact
     * same invoice bytes deterministically on every browser.
     */
    async fetchInvoice(): Promise<{ filename: string; body: Buffer }> {
        await this.downloadInvoiceButton.waitFor({ state: 'visible' })
        const href = await this.downloadInvoiceButton.getAttribute('href')
        if (!href) {
            throw new Error('"Download Invoice" link is missing an href')
        }
        const url = new URL(href, this.page.url()).toString()
        const response = await this.page.request.get(url)
        if (!response.ok()) {
            throw new Error(
                `Invoice request failed: ${response.status()} ${response.statusText()} (${url})`
            )
        }
        const disposition = response.headers()['content-disposition'] ?? ''
        const filename =
            disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i)?.[1] ??
            url.split('/').pop() ??
            'invoice.txt'
        return { filename, body: await response.body() }
    }
}
