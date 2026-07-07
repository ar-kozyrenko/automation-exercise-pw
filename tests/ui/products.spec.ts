import { test, expect } from '../../fixtures/baseFixture'
import { normalizeText } from '../../helpers/text.helper'
import {
    generateEmail,
    generateFirstName,
    generateRandomText,
} from '../../test-data/general.test-data'

test(
    'Verify All Products and product detail page',
    { tag: ['@smoke', '@regression'] },
    async ({ pageManager, page }) => {
        await pageManager.basePage.openPage('/')
        await pageManager.navBar.clickProductsButton()
        await expect(pageManager.productsPage.allProductsTitle).toBeVisible()
        await pageManager.productsPage.clickFirstViewProductLink()
        await expect(page).toHaveURL('/product_details/1')
        await expect(pageManager.productsDetailsPage.category).toBeVisible()
        await expect(pageManager.productsDetailsPage.price).toBeVisible()
        await expect(pageManager.productsDetailsPage.availability).toBeVisible()
        await expect(pageManager.productsDetailsPage.condition).toBeVisible()
        await expect(pageManager.productsDetailsPage.brand).toBeVisible()
        await expect(pageManager.productsDetailsPage.productName).toBeVisible()
        await expect(
            pageManager.productsDetailsPage.productName
        ).not.toBeEmpty()
    }
)
test(
    'Search Product',
    { tag: ['@smoke', '@regression'] },
    async ({ pageManager }) => {
        const searchedItem = 'dress'
        await pageManager.basePage.openPage('/')
        await pageManager.navBar.clickProductsButton()
        await expect(pageManager.productsPage.allProductsTitle).toBeVisible()
        await pageManager.productsPage.submitSearch(searchedItem)
        const names = await pageManager.productsPage.getAllProductsNames()
        expect(names.length).toBeGreaterThan(0)
        const normalizedSearch = normalizeText(searchedItem)
        const matchedProducts = names.filter((name) =>
            normalizeText(name).includes(normalizedSearch)
        )
        expect(matchedProducts.length).toBeGreaterThan(0)
    }
)
test(
    'Add review on product',
    { tag: '@regression' },
    async ({ pageManager }) => {
        const testData = {
            name: generateFirstName(),
            email: generateEmail(),
            review: generateRandomText(),
        }
        await pageManager.basePage.openPage('/')
        await pageManager.navBar.clickProductsButton()
        await expect(pageManager.productsPage.allProductsTitle).toBeVisible()
        await pageManager.productsPage.clickFirstViewProductLink()
        await expect(
            pageManager.productsDetailsPage.writeReviewTab
        ).toBeVisible()
        await pageManager.productsDetailsPage.fillYourName(testData.name)
        await pageManager.productsDetailsPage.fillEmailAddress(testData.email)
        await pageManager.productsDetailsPage.fillAddReview(testData.review)
        await pageManager.productsDetailsPage.clickSubmitReview()
        await expect(
            pageManager.productsDetailsPage.reviewSuccessMessage
        ).toBeVisible()
    }
)
