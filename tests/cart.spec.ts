import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'
import { normalizeText } from '../helpers/ui/text.helper'
import { deleteUser, registerUser } from '../helpers/api/userApi'
import { createUserApi } from '../test-data/register-user.data'

test(
    'Add Products in Cart',
    { tag: ['@smoke', '@regression'] },
    async ({ pageManager, page }) => {
        await pageManager.basePage.openPage('/')
        await pageManager.navBar.clickProductsButton()

        const product1 =
            await pageManager.productsPage.getProductNameAndPrice(0)
        await pageManager.productsPage.addProductToCart(0)
        await pageManager.addedToCartModal.clickContinueShoppingButton()

        const product2 =
            await pageManager.productsPage.getProductNameAndPrice(1)
        await pageManager.productsPage.addProductToCart(1)
        await pageManager.addedToCartModal.clickViewCartButton()

        await expect(page).toHaveURL('/view_cart')
        const cartProduct1 =
            await pageManager.cartPage.cartTable.getProductNamePriceQtyTotalPrice(
                0
            )
        expect(cartProduct1).toMatchObject({
            name: product1.name,
            price: product1.price,
            quantity: '1',
            total: 'Rs. 500',
        })

        const cartProduct2 =
            await pageManager.cartPage.cartTable.getProductNamePriceQtyTotalPrice(
                1
            )
        expect(cartProduct2).toMatchObject({
            name: product2.name,
            price: product2.price,
            quantity: '1',
            total: 'Rs. 400',
        })
    }
)
test(
    'Verify Product quantity in Cart',
    { tag: ['@smoke', '@regression'] },
    async ({ pageManager, page }) => {
        await pageManager.basePage.openPage('/')
        await pageManager.navBar.productsButton.click()
        await expect(page).toHaveURL(/\/products\/?$/)
        await pageManager.productsPage.clickFirstViewProductLink()
        await expect(page).toHaveURL(/\/product_details\/\d+$/)
        await pageManager.productsDetailsPage.fillQuantity(4)
        await pageManager.productsDetailsPage.clickAddToCartButton()
        await pageManager.addedToCartModal.clickViewCartButton()
        await expect(page).toHaveURL(/\/view_cart\/?$/)
        const inCartQuantity = (
            await pageManager.cartPage.cartTable.getProductNamePriceQtyTotalPrice(
                0
            )
        ).quantity
        expect(Number(inCartQuantity)).toBe(4)
    }
)

test(
    'Remove Products From Cart',
    { tag: ['@smoke', '@regression'] },
    async ({ pageManager, page }) => {
        await pageManager.basePage.openPage('/')
        await pageManager.homePage.productSection.addProductToCart(0)
        await pageManager.addedToCartModal.clickViewCartButton()
        await expect(page).toHaveURL(/\/view_cart\/?$/)
        await pageManager.cartPage.cartTable.removeProduct(0)
        await expect(pageManager.cartPage.emptyCartMessage).toContainText(
            'Cart is empty!'
        )
    }
)
test(
    'Search Products and Verify Cart After Login',
    { tag: ['@smoke', '@regression'] },
    async ({ pageManager, request }) => {
        const userData = createUserApi()

        await test.step('Register user via API', async () => {
            await registerUser(request, userData)
        })

        await test.step('Open Products page', async () => {
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickProductsButton()

            await expect(
                pageManager.productsPage.allProductsTitle
            ).toBeVisible()
        })

        const searchedProduct = 'top'
        let searchResults: string[] = []

        await test.step('Search products', async () => {
            await pageManager.productsPage.submitSearch(searchedProduct)

            searchResults = await pageManager.productsPage.getAllProductsNames()

            expect(searchResults.length).toBeGreaterThan(0)

            const normalizedSearch = normalizeText(searchedProduct)

            const matchedProducts = searchResults.filter((name) =>
                normalizeText(name).includes(normalizedSearch)
            )

            expect(matchedProducts.length).toBeGreaterThan(0)
        })

        await test.step('Add search results to cart', async () => {
            for (let i = 0; i < searchResults.length; i++) {
                await pageManager.productsPage.productSection.addProductToCart(
                    i
                )
                await pageManager.addedToCartModal.clickContinueShoppingButton()
            }
        })

        await test.step('Verify products in cart', async () => {
            await pageManager.navBar.clickCartButton()

            const inCartProducts =
                await pageManager.cartPage.cartTable.getAllProductsNames()

            expect(inCartProducts).toEqual(searchResults)
        })

        await test.step('Login with registered user', async () => {
            await pageManager.navBar.clickSignUpLogInButton()

            await pageManager.loginPage.submitLogInForm({
                email: userData.email,
                password: userData.password,
            })
        })

        await test.step('Verify cart after login', async () => {
            await pageManager.navBar.clickCartButton()

            const inCartProductsAfterLogin =
                await pageManager.cartPage.cartTable.getAllProductsNames()

            expect(inCartProductsAfterLogin).toEqual(searchResults)
        })

        await test.step('Delete user via API', async () => {
            await deleteUser(request, userData)
        })
    }
)
