import { test, expect } from '../../fixtures/baseFixture'
import { createUserApi } from '../../test-data/register-user.data'
import { LogInFormData, UserApi } from '../../types/forms'

test.describe('LogIn - positive', () => {
    test(
        'Login User with correct email and password',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager, registeredUser }) => {
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
            await pageManager.loginPage.submitLogInForm(
                registeredUser.credentials
            )
            await expect(
                pageManager.navBar.getLoggedInAsUserButton(
                    registeredUser.data.name
                )
            ).toBeVisible()
        }
    )
})

test.describe('LogIn - negative', () => {
    test(
        'Login User with incorrect email and password',
        {
            tag: ['@regression'],
        },
        async ({ pageManager }) => {
            const incorrectLoginData: LogInFormData = {
                email: 'wrong@email.com',
                password: 'wrongPassword',
            }
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await pageManager.loginPage.submitLogInForm(incorrectLoginData)
            await expect(pageManager.loginPage.loginErrorMessage).toBeVisible()
        }
    )
})

test.describe('Log Out', () => {
    test(
        'Logout User',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager, registeredUser }) => {
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
            await pageManager.loginPage.submitLogInForm(
                registeredUser.credentials
            )
            await expect(
                pageManager.navBar.getLoggedInAsUserButton(
                    registeredUser.data.name
                )
            ).toBeVisible()
            await pageManager.navBar.clickLogOutButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
        }
    )
})
