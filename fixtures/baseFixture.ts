import { test as base } from '@playwright/test'
import { PageManager } from '../base/PageManager'

type Pages = {
    pageManager: PageManager
}

export const test = base.extend<Pages>({
    pageManager: async ({ page }, use) => {
        await page.route('**/*doubleclick*', (route) => route.abort())
        await page.route('**/*googlesyndication*', (route) => route.abort())
        await page.route('**/*googleads*', (route) => route.abort())
        await page.route('**/*adsbygoogle*', (route) => route.abort())

        const pageManager = new PageManager(page)
        await use(pageManager)
    },
})
