import { test, expect } from '../../fixtures/baseFixture'
import {
    generateSignUpData,
    generateRegistrationData,
} from '../../test-data/register-user.data'
import {
    generateRandomText,
    generatePaymentData,
} from '../../test-data/general.test-data'
import fs from 'fs'
import { normalizePrice } from '../../helpers/text.helper'
import path from 'path'
import { registerNewUserViaUI, deleteAccount } from '../../steps/user.steps'
import { addFirstProductToCart } from '../../steps/cart.steps'
import {
    assertCheckoutHeadingsVisible,
    assertAddressesMatch,
    assertCartProductMatches,
    placeOrderAndVerifyPayment,
} from '../../steps/checkout.steps'

test.describe('Checkout - positive', () => {
    test(
        'Place Order: Register while Checkout',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager, page }) => {
            const userSignUpData = generateSignUpData()
            const userRegistrationData = generateRegistrationData({
                name: userSignUpData.name,
            })
            let addedProduct: { name: string; price: string }

            await test.step('Add product to cart', async () => {
                await pageManager.basePage.openPage('/')
                addedProduct = await addFirstProductToCart(pageManager, page)
            })

            await test.step('Register user during checkout', async () => {
                await pageManager.cartPage.clickProceedToCheckout()
                await pageManager.checkoutModal.clickRegisterLoginButton()
                await registerNewUserViaUI(
                    pageManager,
                    userSignUpData,
                    userRegistrationData
                )
            })

            await test.step('Verify checkout details', async () => {
                await pageManager.navBar.clickCartButton()
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await assertCheckoutHeadingsVisible(pageManager)
                await assertAddressesMatch(pageManager, userRegistrationData)
                await assertCartProductMatches(
                    pageManager,
                    addedProduct,
                    'Rs. 500'
                )
            })

            await test.step('Place order and verify successful payment', async () => {
                const text = generateRandomText()
                await placeOrderAndVerifyPayment(
                    pageManager,
                    page,
                    text,
                    generatePaymentData()
                )
            })

            await test.step('Delete account', async () => {
                await deleteAccount(pageManager)
            })
        }
    )

    test(
        'Place Order: Register before Checkout',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager, page }) => {
            const userSignUpData = generateSignUpData()
            const userRegistrationData = generateRegistrationData({
                name: userSignUpData.name,
            })
            let addedProduct: { name: string; price: string }

            await test.step('Register user', async () => {
                await pageManager.basePage.openPage('/')
                await pageManager.navBar.clickSignUpLogInButton()
                await registerNewUserViaUI(
                    pageManager,
                    userSignUpData,
                    userRegistrationData
                )
            })
            await test.step('Add product to cart', async () => {
                addedProduct = await addFirstProductToCart(pageManager, page)
            })

            await test.step('Verify checkout details', async () => {
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await assertAddressesMatch(pageManager, userRegistrationData)
                await assertCartProductMatches(
                    pageManager,
                    addedProduct,
                    'Rs. 500'
                )
            })

            await test.step('Place order and verify successful payment', async () => {
                const text = generateRandomText()
                await placeOrderAndVerifyPayment(
                    pageManager,
                    page,
                    text,
                    generatePaymentData()
                )
            })

            await test.step('Delete account', async () => {
                await deleteAccount(pageManager)
            })
        }
    )

    test(
        'Place Order: Login before Checkout',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager, page }) => {
            const userSignUpData = generateSignUpData()
            const userRegistrationData = generateRegistrationData({
                name: userSignUpData.name,
            })
            let addedProduct: { name: string; price: string }

            await test.step('Register user - pre-condition', async () => {
                await pageManager.basePage.openPage('/')
                await pageManager.navBar.clickSignUpLogInButton()
                await registerNewUserViaUI(
                    pageManager,
                    userSignUpData,
                    userRegistrationData
                )
            })
            await test.step('Logout user - pre-condition', async () => {
                await pageManager.navBar.clickLogOutButton()
                await expect(pageManager.loginPage.logInHeading).toBeVisible()
            })

            await test.step('Login to the system', async () => {
                await pageManager.navBar.clickSignUpLogInButton()
                await pageManager.loginPage.submitLogInForm({
                    email: userSignUpData.email,
                    password: userRegistrationData.password,
                })
                await expect(
                    pageManager.navBar.getLoggedInAsUserButton(
                        userRegistrationData.name
                    )
                ).toBeVisible()
            })
            await test.step('Add product to cart', async () => {
                addedProduct = await addFirstProductToCart(pageManager, page)
            })

            await test.step('Verify checkout details', async () => {
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await assertAddressesMatch(pageManager, userRegistrationData)
                await assertCartProductMatches(
                    pageManager,
                    addedProduct,
                    'Rs. 500'
                )
            })

            await test.step('Place order and verify successful payment', async () => {
                const text = generateRandomText()
                await placeOrderAndVerifyPayment(
                    pageManager,
                    page,
                    text,
                    generatePaymentData()
                )
            })

            await test.step('Delete account', async () => {
                await deleteAccount(pageManager)
            })
        }
    )
    test(
        'Verify address details in checkout page',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager, page }) => {
            const userSignUpData = generateSignUpData()
            const userRegistrationData = generateRegistrationData({
                name: userSignUpData.name,
            })
            await test.step('Register user', async () => {
                await pageManager.basePage.openPage('/')
                await pageManager.navBar.clickSignUpLogInButton()
                await registerNewUserViaUI(
                    pageManager,
                    userSignUpData,
                    userRegistrationData
                )
            })
            await test.step('Add product to cart', async () => {
                await pageManager.homePage.productSection.addProductToCart(0)
                await pageManager.addedToCartModal.clickViewCartButton()
                await expect(page).toHaveURL(/\/view_cart\/?$/)
            })

            await test.step('Verify checkout details', async () => {
                await expect(
                    pageManager.cartPage.proceedToCheckoutLink
                ).toBeVisible()
                await expect(
                    pageManager.cartPage.proceedToCheckoutLink
                ).toBeEnabled()
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await assertAddressesMatch(pageManager, userRegistrationData)
            })
        }
    )

    test(
        'Download Invoice after purchase order',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager, page }) => {
            const userSignUpData = generateSignUpData()
            const userRegistrationData = generateRegistrationData({
                name: userSignUpData.name,
            })
            const fullName = `${userRegistrationData.firstName} ${userRegistrationData.lastName}`
            let addedProduct: { name: string; price: string }

            await test.step('Add product to cart', async () => {
                await pageManager.basePage.openPage('/')
                addedProduct = await addFirstProductToCart(pageManager, page)
            })

            await test.step('Register user during checkout', async () => {
                await pageManager.cartPage.clickProceedToCheckout()
                await pageManager.checkoutModal.clickRegisterLoginButton()
                await registerNewUserViaUI(
                    pageManager,
                    userSignUpData,
                    userRegistrationData
                )
            })

            await test.step('Verify checkout details', async () => {
                await pageManager.navBar.clickCartButton()
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await assertCheckoutHeadingsVisible(pageManager)
                await assertAddressesMatch(pageManager, userRegistrationData)
                await assertCartProductMatches(
                    pageManager,
                    addedProduct,
                    'Rs. 500'
                )
            })

            await test.step('Place order and verify successful payment', async () => {
                const text = generateRandomText()
                await placeOrderAndVerifyPayment(
                    pageManager,
                    page,
                    text,
                    generatePaymentData()
                )
            })
            await test.step('Download and Assert Invoice', async () => {
                const downloadPromise = page.waitForEvent('download')
                await pageManager.orderPlacedPage.downloadInvoiceButton.click()
                const download = await downloadPromise
                const downloadPath = path.join(
                    'downloads',
                    download.suggestedFilename()
                )
                await download.saveAs(downloadPath)
                expect(fs.existsSync(downloadPath)).toBeTruthy()
                const stats = fs.statSync(downloadPath)
                expect(stats.size).toBeGreaterThan(0)
                const content = fs.readFileSync(downloadPath, 'utf8')
                const expectedPrice = normalizePrice(addedProduct.price)
                expect(content).toContain(fullName)
                expect(content).toContain(expectedPrice)
                expect(content).toContain('Your total purchase amount is')
                expect(content).toContain('Thank you')
            })

            await test.step('Delete account', async () => {
                await deleteAccount(pageManager)
            })
        }
    )
})
