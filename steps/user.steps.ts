import { expect } from '@playwright/test'
import { PageManager } from '../base/PageManager'
import { RegistrationFormData, SignUpFormData } from '../types/forms'

export async function registerNewUserViaUI(
    pageManager: PageManager,
    signUpData: SignUpFormData,
    registrationData: RegistrationFormData
): Promise<void> {
    await pageManager.loginPage.submitSignUpForm(signUpData)
    await pageManager.registerPage.fillRegistrationForm(registrationData)
    await pageManager.registerPage.clickCreateAccountButton()
    await expect(pageManager.registerPage.accountCreatedHeading).toBeVisible()
    await pageManager.basePage.clickContinueButton()
    await expect(
        pageManager.navBar.getLoggedInAsUserButton(registrationData.name)
    ).toBeVisible()
}

export async function deleteAccount(pageManager: PageManager): Promise<void> {
    await pageManager.navBar.clickDeleteAccountButton()
    await expect(
        pageManager.deleteAccountPage.accountDeletedHeading
    ).toBeVisible()
    await pageManager.basePage.clickContinueButton()
}
