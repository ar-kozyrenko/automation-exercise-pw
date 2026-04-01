import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'
import { signUpData, registrationData } from '../test-data/register-user.data'
import { registerUser, deleteUser } from '../helpers/api/userApi'
import { SignUpFormData } from '../types/forms'

test.describe('User registration - positive', () => {
    test(
        'Positive user registration and delete',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager }) => {
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.signUpHeading).toBeVisible()
            await pageManager.loginPage.submitSignUpForm(signUpData)
            await expect(
                pageManager.signUpPage.accountInfoHeading
            ).toBeVisible()
            await pageManager.signUpPage.fillRegistrationForm(registrationData)
            await pageManager.signUpPage.clickCreateAccountButton()
            await expect(
                pageManager.signUpPage.accountCreatedHeading
            ).toBeVisible()
            await pageManager.basePage.clickContinueButton()
            await expect(
                pageManager.navBar.getLoggedInAsUserButton(
                    registrationData.name
                )
            ).toBeVisible()
            await pageManager.navBar.clickDeleteAccountButton()
            await expect(
                pageManager.deleteAccountPage.accountDeletedHeading
            ).toBeVisible()
            await pageManager.basePage.clickContinueButton()
        }
    )
})

test.describe('User registration - negative', () => {
    test.beforeEach(async ({ request }) => {
        await registerUser(request)
    })

    test.afterEach(async ({ request }) => {
        await deleteUser(request)
    })
    test(
        'Register User with existing email',
        { tag: ['@regression'] },
        async ({ pageManager }) => {
            const existingUserData: SignUpFormData = {
                name: registrationData.name,
                email: signUpData.email,
            }
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.signUpHeading).toBeVisible()
            await pageManager.loginPage.submitSignUpForm(existingUserData)
            await expect(pageManager.loginPage.signUpErrorMessage).toBeVisible()
        }
    )
})
