import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'
import {
    generateSignUpData,
    generateRegistrationData,
} from '../test-data/register-user.data'
import {
    generateRandomText,
    generatePaymentData,
} from '../test-data/general.test-data'
import fs from 'fs'
import { normalizePrice } from '../helpers/ui/text.helper'
import path from 'path'

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
                addedProduct =
                    await pageManager.homePage.productSection.getProductNameAndPrice(
                        0
                    )
                await pageManager.homePage.productSection.addProductToCart(0)
                await pageManager.addedToCartModal.clickViewCartButton()
                await expect(page).toHaveURL(/\/view_cart\/?$/)
            })

            await test.step('Register user during checkout', async () => {
                await pageManager.cartPage.clickProceedToCheckout()
                await pageManager.checkoutModal.clickRegisterLoginButton()
                await pageManager.loginPage.submitSignUpForm(userSignUpData)
                await pageManager.registerPage.fillRegistrationForm(
                    userRegistrationData
                )
                await pageManager.registerPage.clickCreateAccountButton()
                await expect(
                    pageManager.registerPage.accountCreatedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
                await expect(
                    pageManager.navBar.getLoggedInAsUserButton(
                        userRegistrationData.name
                    )
                ).toBeVisible()
            })

            await test.step('Verify checkout details', async () => {
                await pageManager.navBar.clickCartButton()
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await expect(
                    pageManager.checkoutPage.addressDetailsHeading
                ).toBeVisible()
                await expect(
                    pageManager.checkoutPage.yourDeliveryAddressHeading
                ).toBeVisible()
                await expect(
                    pageManager.checkoutPage.yourBillingAddressHeading
                ).toBeVisible()
                await pageManager.checkoutPage.assertDeliveryAddressContains(
                    userRegistrationData
                )
                await pageManager.checkoutPage.assertBillingAddressContains(
                    userRegistrationData
                )
                const cartProduct =
                    await pageManager.checkoutPage.cartTable.getProductNamePriceQtyTotalPrice(
                        0
                    )
                expect(cartProduct).toMatchObject({
                    name: addedProduct.name,
                    price: addedProduct.price,
                    quantity: '1',
                    total: 'Rs. 500',
                })
            })

            await test.step('Place order and verify successful payment', async () => {
                const text = generateRandomText()
                await pageManager.checkoutPage.addComment(text)
                await expect(pageManager.checkoutPage.commentField).toHaveValue(
                    text
                )
                await pageManager.checkoutPage.clickPlaceOrder()
                const cartData = generatePaymentData()
                await pageManager.paymentPage.fillPaymentForm(cartData)
                await pageManager.paymentPage.clickPayAndConfirmButton()
                await expect(
                    pageManager.orderPlacedPage.orderPlacedHeading
                ).toBeVisible()
                await expect(
                    pageManager.orderPlacedPage.orderConfirmedText
                ).toBeVisible()
                await expect(page).toHaveURL(/\/payment_done\/\d+$/)
            })

            await test.step('Delete account', async () => {
                await pageManager.navBar.clickDeleteAccountButton()
                await expect(
                    pageManager.deleteAccountPage.accountDeletedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
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
                await pageManager.loginPage.submitSignUpForm(userSignUpData)
                await pageManager.registerPage.fillRegistrationForm(
                    userRegistrationData
                )
                await pageManager.registerPage.clickCreateAccountButton()
                await expect(
                    pageManager.registerPage.accountCreatedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
                await expect(
                    pageManager.navBar.getLoggedInAsUserButton(
                        userRegistrationData.name
                    )
                ).toBeVisible()
            })
            await test.step('Add product to cart', async () => {
                addedProduct =
                    await pageManager.homePage.productSection.getProductNameAndPrice(
                        0
                    )
                await pageManager.homePage.productSection.addProductToCart(0)
                await pageManager.addedToCartModal.clickViewCartButton()
                await expect(page).toHaveURL(/\/view_cart\/?$/)
            })

            await test.step('Verify checkout details', async () => {
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await pageManager.checkoutPage.assertDeliveryAddressContains(
                    userRegistrationData
                )
                await pageManager.checkoutPage.assertBillingAddressContains(
                    userRegistrationData
                )
                const cartProduct =
                    await pageManager.checkoutPage.cartTable.getProductNamePriceQtyTotalPrice(
                        0
                    )
                expect(cartProduct).toMatchObject({
                    name: addedProduct.name,
                    price: addedProduct.price,
                    quantity: '1',
                    total: 'Rs. 500',
                })
            })

            await test.step('Place order and verify successful payment', async () => {
                const text = generateRandomText()
                await pageManager.checkoutPage.addComment(text)
                await expect(pageManager.checkoutPage.commentField).toHaveValue(
                    text
                )
                await pageManager.checkoutPage.clickPlaceOrder()
                const cartData = generatePaymentData()
                await pageManager.paymentPage.fillPaymentForm(cartData)
                await pageManager.paymentPage.clickPayAndConfirmButton()
                await expect(
                    pageManager.orderPlacedPage.orderPlacedHeading
                ).toBeVisible()
                await expect(
                    pageManager.orderPlacedPage.orderConfirmedText
                ).toBeVisible()
                await expect(page).toHaveURL(/\/payment_done\/\d+$/)
            })

            await test.step('Delete account', async () => {
                await pageManager.navBar.clickDeleteAccountButton()
                await expect(
                    pageManager.deleteAccountPage.accountDeletedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
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
                await pageManager.loginPage.submitSignUpForm(userSignUpData)
                await pageManager.registerPage.fillRegistrationForm(
                    userRegistrationData
                )
                await pageManager.registerPage.clickCreateAccountButton()
                await expect(
                    pageManager.registerPage.accountCreatedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
                await expect(
                    pageManager.navBar.getLoggedInAsUserButton(
                        userRegistrationData.name
                    )
                ).toBeVisible()
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
                addedProduct =
                    await pageManager.homePage.productSection.getProductNameAndPrice(
                        0
                    )
                await pageManager.homePage.productSection.addProductToCart(0)
                await pageManager.addedToCartModal.clickViewCartButton()
                await expect(page).toHaveURL(/\/view_cart\/?$/)
            })

            await test.step('Verify checkout details', async () => {
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await pageManager.checkoutPage.assertDeliveryAddressContains(
                    userRegistrationData
                )
                await pageManager.checkoutPage.assertBillingAddressContains(
                    userRegistrationData
                )
                const cartProduct =
                    await pageManager.checkoutPage.cartTable.getProductNamePriceQtyTotalPrice(
                        0
                    )
                expect(cartProduct).toMatchObject({
                    name: addedProduct.name,
                    price: addedProduct.price,
                    quantity: '1',
                    total: 'Rs. 500',
                })
            })

            await test.step('Place order and verify successful payment', async () => {
                const text = generateRandomText()
                await pageManager.checkoutPage.addComment(text)
                await expect(pageManager.checkoutPage.commentField).toHaveValue(
                    text
                )
                await pageManager.checkoutPage.clickPlaceOrder()
                const cartData = generatePaymentData()
                await pageManager.paymentPage.fillPaymentForm(cartData)
                await pageManager.paymentPage.clickPayAndConfirmButton()
                await expect(
                    pageManager.orderPlacedPage.orderPlacedHeading
                ).toBeVisible()
                await expect(
                    pageManager.orderPlacedPage.orderConfirmedText
                ).toBeVisible()
                await expect(page).toHaveURL(/\/payment_done\/\d+$/)
            })

            await test.step('Delete account', async () => {
                await pageManager.navBar.clickDeleteAccountButton()
                await expect(
                    pageManager.deleteAccountPage.accountDeletedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
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
                await pageManager.loginPage.submitSignUpForm(userSignUpData)
                await pageManager.registerPage.fillRegistrationForm(
                    userRegistrationData
                )
                await pageManager.registerPage.clickCreateAccountButton()
                await expect(
                    pageManager.registerPage.accountCreatedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
                await expect(
                    pageManager.navBar.getLoggedInAsUserButton(
                        userRegistrationData.name
                    )
                ).toBeVisible()
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
                await pageManager.checkoutPage.assertDeliveryAddressContains(
                    userRegistrationData
                )
                await pageManager.checkoutPage.assertBillingAddressContains(
                    userRegistrationData
                )
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
                addedProduct =
                    await pageManager.homePage.productSection.getProductNameAndPrice(
                        0
                    )
                await pageManager.homePage.productSection.addProductToCart(0)
                await pageManager.addedToCartModal.clickViewCartButton()
                await expect(page).toHaveURL(/\/view_cart\/?$/)
            })

            await test.step('Register user during checkout', async () => {
                await pageManager.cartPage.clickProceedToCheckout()
                await pageManager.checkoutModal.clickRegisterLoginButton()
                await pageManager.loginPage.submitSignUpForm(userSignUpData)
                await pageManager.registerPage.fillRegistrationForm(
                    userRegistrationData
                )
                await pageManager.registerPage.clickCreateAccountButton()
                await expect(
                    pageManager.registerPage.accountCreatedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
                await expect(
                    pageManager.navBar.getLoggedInAsUserButton(
                        userRegistrationData.name
                    )
                ).toBeVisible()
            })

            await test.step('Verify checkout details', async () => {
                await pageManager.navBar.clickCartButton()
                await pageManager.cartPage.clickProceedToCheckout()
                await expect(page).toHaveURL(/\/checkout\/?$/)
                await expect(
                    pageManager.checkoutPage.addressDetailsHeading
                ).toBeVisible()
                await expect(
                    pageManager.checkoutPage.yourDeliveryAddressHeading
                ).toBeVisible()
                await expect(
                    pageManager.checkoutPage.yourBillingAddressHeading
                ).toBeVisible()
                await pageManager.checkoutPage.assertDeliveryAddressContains(
                    userRegistrationData
                )
                await pageManager.checkoutPage.assertBillingAddressContains(
                    userRegistrationData
                )
                const cartProduct =
                    await pageManager.checkoutPage.cartTable.getProductNamePriceQtyTotalPrice(
                        0
                    )
                expect(cartProduct).toMatchObject({
                    name: addedProduct.name,
                    price: addedProduct.price,
                    quantity: '1',
                    total: 'Rs. 500',
                })
            })

            await test.step('Place order and verify successful payment', async () => {
                const text = generateRandomText()
                await pageManager.checkoutPage.addComment(text)
                await expect(pageManager.checkoutPage.commentField).toHaveValue(
                    text
                )
                await pageManager.checkoutPage.clickPlaceOrder()
                const cartData = generatePaymentData()
                await pageManager.paymentPage.fillPaymentForm(cartData)
                await pageManager.paymentPage.clickPayAndConfirmButton()
                await expect(
                    pageManager.orderPlacedPage.orderPlacedHeading
                ).toBeVisible()
                await expect(
                    pageManager.orderPlacedPage.orderConfirmedText
                ).toBeVisible()
                await expect(page).toHaveURL(/\/payment_done\/\d+$/)
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
                await pageManager.navBar.clickDeleteAccountButton()
                await expect(
                    pageManager.deleteAccountPage.accountDeletedHeading
                ).toBeVisible()
                await pageManager.basePage.clickContinueButton()
            })
        }
    )
})
