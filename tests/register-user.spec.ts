import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'

test.describe('User registration tests', () => {
    test(
        'Positive registration',
        { tag: ['@smoke', '@regression'] },
        async ({ page, pageManager }) => {
            const username = 'testUserName'
            const email = 'lelmiyukne@necub.com'
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.signUpHeading).toBeVisible()
            await pageManager.loginPage.fillSignUpForm({
                name: username,
                email: email,
            })
            await expect(
                page.getByRole('heading', { name: 'Enter Account Information' })
            ).toBeVisible()
            //await page.getByRole('radio', { name: 'Mr.' }).click()
            // await page.getByTestId('name').fill(username)
            //await page.getByTestId('password').fill('test123')
            // await page.getByTestId('days').selectOption('3')
            // await page.getByTestId('months').selectOption('1')
            // await page.getByTestId('years').selectOption('2017')
            // await page.getByLabel('Sign up for our newsletter!').click()
            // await page
            //     .getByLabel('Receive special offers from our partners!')
            //     .click()
            // await page.getByTestId('first_name').fill('testFirstName')
            // await page.getByTestId('last_name').fill('TestLastName')
            // await page.getByTestId('company').fill('TestCompany')
            // await page.getByTestId('address').fill('TestAddress')
            // await page.getByTestId('address2').fill('TestAddress2')
            // await page.getByTestId('country').selectOption('Canada')
            // await page.getByTestId('state').fill('TestState')
            // await page.getByTestId('city').fill('TestCity')
            // await page.getByTestId('zipcode').fill('1234')
            // await page.getByTestId('mobile_number').fill('12345678')
            // await page.getByTestId('create-account').click()
            //await expect(page.getByTestId('account-created')).toBeVisible()
            //await page.getByTestId('continue-button').click()
            // await expect(
            //     page.getByText(`Logged in as ${username}`)
            // ).toBeVisible()
            //await page.getByRole('link', { name: 'Delete Account' }).click()
            //await expect(page.getByTestId('account-deleted')).toBeVisible()
            //await page.getByTestId('continue-button').click()
        }
    )
})
