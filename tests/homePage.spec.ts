import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'

test('Add to cart from Recommended items', async ({ pageManager }) => {
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
        await pageManager.cartPage.cartTable.getProductNamePriceQtyTotalPrice(0)

    expect(inCartProduct).toMatchObject({ name, price })
})
