import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'
import { signUpData, registrationData } from '../test-data/register-user.data'

test.describe('User registration tests', () => {
    test(
        'Positive registration',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager }) => {
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.signUpHeading).toBeVisible()
            await pageManager.loginPage.fillSignUpForm(signUpData)
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
