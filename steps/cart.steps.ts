import { Page, expect } from '@playwright/test'
import { PageManager } from '../base/PageManager'

export async function addFirstProductToCart(
    pageManager: PageManager,
    page: Page
): Promise<{ name: string; price: string }> {
    const product =
        await pageManager.homePage.productSection.getProductNameAndPrice(0)
    await pageManager.homePage.productSection.addProductToCart(0)
    await pageManager.addedToCartModal.clickViewCartButton()
    await expect(page).toHaveURL(/\/view_cart\/?$/)
    return product
}
