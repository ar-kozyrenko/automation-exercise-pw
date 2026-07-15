import { test, expect } from '../../fixtures/baseFixture'
import {
    generateSignUpData,
    generateRegistrationData,
} from '../../test-data/register-user.data'
import { SignUpFormData } from '../../types/forms'
import { deleteAccount } from '../../steps/user.steps'

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
            await deleteAccount(pageManager)
        }
    )
})

test.describe('User registration - negative', () => {
    test(
        'Register User with existing email',
        { tag: ['@regression'] },
        async ({ pageManager, registeredUser }) => {
            const existingUserData: SignUpFormData = {
                name: registeredUser.data.name,
                email: registeredUser.data.email,
            }
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.signUpHeading).toBeVisible()
            await pageManager.loginPage.submitSignUpForm(existingUserData)
            await expect(pageManager.loginPage.signUpErrorMessage).toBeVisible()
        }
    )
})
