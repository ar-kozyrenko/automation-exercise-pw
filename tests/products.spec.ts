import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'

test('Verify All Products and product detail page', async ({
    pageManager,
    page,
}) => {
    await pageManager.basePage.openPage('/')
    await pageManager.navBar.clickProductsButton()
    await expect(page).toHaveURL('/products')
    await 

})
