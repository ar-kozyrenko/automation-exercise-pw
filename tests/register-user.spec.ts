import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'
import {
    generateSignUpData,
    generateRegistrationData,
    createUserApi,
} from '../test-data/register-user.data'
import { registerUser, deleteUser } from '../helpers/api/userApi'
import { SignUpFormData, UserApi } from '../types/forms'

test.describe('User registration - positive', () => {
    test(
        'Positive user registration and delete',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager }) => {
            const userSignUpData = generateSignUpData()
            const userRegistrationData = generateRegistrationData({
                name: userSignUpData.name,
            })

            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.signUpHeading).toBeVisible()
            await pageManager.loginPage.submitSignUpForm(userSignUpData)
            await expect(
                pageManager.registerPage.accountInfoHeading
            ).toBeVisible()
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
            await pageManager.navBar.clickDeleteAccountButton()
            await expect(
                pageManager.deleteAccountPage.accountDeletedHeading
            ).toBeVisible()
            await pageManager.basePage.clickContinueButton()
        }
    )
})

test.describe('User registration - negative', () => {
    let user: UserApi

    test.beforeEach(async ({ request }) => {
        user = createUserApi()
        await registerUser(request, user)
    })

    test.afterEach(async ({ request }) => {
        await deleteUser(request, user)
    })
    test(
        'Register User with existing email',
        { tag: ['@regression'] },
        async ({ pageManager }) => {
            const existingUserData: SignUpFormData = {
                name: user.name,
                email: user.email,
            }
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.signUpHeading).toBeVisible()
            await pageManager.loginPage.submitSignUpForm(existingUserData)
            await expect(pageManager.loginPage.signUpErrorMessage).toBeVisible()
        }
    )
})
