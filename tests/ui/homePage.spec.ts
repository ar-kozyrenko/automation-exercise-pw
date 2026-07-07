import { test, expect } from '../../fixtures/baseFixture'

test(
    'Add to cart from Recommended items',
    { tag: '@regression' },
    async ({ pageManager }) => {
        await pageManager.basePage.openPage('/')
        await expect(pageManager.homePage.recommendedItems.title).toBeVisible()
        const name =
            await pageManager.homePage.recommendedItems.getFirstRecommendedProductName()
        const price =
            await pageManager.homePage.recommendedItems.getFirstRecommendedProductPrice()

        await pageManager.homePage.recommendedItems.addToCartFirstRecommendedProduct()
        await expect(pageManager.addedToCartModal.viewCartButton).toBeVisible()
        await pageManager.addedToCartModal.clickViewCartButton()
        const inCartProduct =
            await pageManager.cartPage.cartTable.getProductNamePriceQtyTotalPrice(
                0
            )

        expect(inCartProduct).toMatchObject({ name, price })
    }
)
test(
    'Verify Scroll Up using "Arrow" button and Scroll Down functionality',
    { tag: '@regression' },
    async ({ pageManager }) => {
        await pageManager.basePage.openPage('/')
        await pageManager.basePage.scrollToBottom()
        await expect(pageManager.footer.subscriptionHeading).toBeVisible()
        await pageManager.basePage.clickScrollUpButton()
        await expect(
            pageManager.homePage.automationPracticeSubHeading
        ).toBeVisible()
        await expect(
            pageManager.homePage.automationPracticeSubHeading
        ).toHaveText('Full-Fledged practice website for Automation Engineers')
    }
)
test(
    'Verify Scroll Up without "Arrow" button and Scroll Down functionality',
    { tag: '@regression' },
    async ({ pageManager }) => {
        await pageManager.basePage.openPage('/')
        await pageManager.basePage.scrollToBottom()
        await expect(pageManager.footer.subscriptionHeading).toBeVisible()
        await pageManager.basePage.scrollToTop()
        await expect(
            pageManager.homePage.automationPracticeSubHeading
        ).toBeVisible()
        await expect(
            pageManager.homePage.automationPracticeSubHeading
        ).toHaveText('Full-Fledged practice website for Automation Engineers')
    }
)
