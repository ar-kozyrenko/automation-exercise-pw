import { test, expect } from '../../fixtures/baseFixture'
import { generateEmail } from '../../test-data/general.test-data'

test(
    'Verify Subscription',
    { tag: ['@smoke', '@regression'] },
    async ({ pageManager }) => {
        const email = generateEmail()
        await pageManager.basePage.openPage('/')
        await expect(pageManager.footer.subscriptionHeading).toBeVisible()
        await pageManager.footer.submitSubscriptionRequest(email)
        await expect(pageManager.footer.successMessage).toContainText(
            'You have been successfully subscribed!'
        )
    }
)

test(
    'Subscription block is available',
    { tag: '@regression' },
    async ({ pageManager, page }) => {
        const pages = [
            '/view_cart',
            '/products',
            '/login',
            '/test_cases',
            '/api_list',
            '/contact_us',
        ]

        for (const url of pages) {
            await page.goto(url)
            await expect(pageManager.footer.subscriptionHeading).toBeVisible()
            await expect(pageManager.footer.emailInput).toBeVisible()
            await expect(pageManager.footer.submitButton).toBeVisible()
        }
    }
)
