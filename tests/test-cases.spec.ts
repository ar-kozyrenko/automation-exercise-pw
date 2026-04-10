import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'

test('Verify Test Cases Page', async ({ pageManager, page }) => {
    await pageManager.basePage.openPage('/')
    await pageManager.navBar.clickTestCasesButton()
    await expect(page).toHaveURL('/test_cases')
    await expect(pageManager.productsPage.allProductsTitle).toBeVisible()
    await pageManager.productsPage.clickFirstViewProductLink()
    await expect(page).toHaveURL('/product_details/1')
    await expect(
        pageManager.productsDetailsPage.productInfoBlock
    ).toContainText(['Category', 'Rs.', 'Availability', 'Condition', 'Brand'])
    await expect(pageManager.productsDetailsPage.productName).toBeVisible()
    await expect(pageManager.productsDetailsPage.productName).not.toBeEmpty()
})
