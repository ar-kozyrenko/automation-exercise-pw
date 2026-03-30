import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'
import { signUpData, registrationData } from '../test-data/register-user.data'
import { registerUser, deleteUser } from '../helpers/api/userApi'
import { LogInFormData } from '../types/forms'

test.describe('LogIn - positive', () => {
    test.beforeEach(async ({ request }) => {
        await registerUser(request)
    })

    test.afterEach(async ({ request }) => {
        await deleteUser(request)
    })
    test(
        'Login User with correct email and password',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager }) => {
            const loginData: LogInFormData = {
                email: signUpData.email,
                password: registrationData.password,
            }
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
            await pageManager.loginPage.submitLogInForm(loginData)
            await expect(
                pageManager.navBar.getLoggedInAsUserButton(
                    registrationData.name
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
    test.beforeEach(async ({ request }) => {
        await registerUser(request)
    })

    test.afterEach(async ({ request }) => {
        await deleteUser(request)
    })

    test(
        'Logout User',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager }) => {
            const loginData: LogInFormData = {
                email: signUpData.email,
                password: registrationData.password,
            }
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
            await pageManager.loginPage.submitLogInForm(loginData)
            await expect(
                pageManager.navBar.getLoggedInAsUserButton(
                    registrationData.name
                )
            ).toBeVisible()
            await pageManager.navBar.clickLogOutButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
        }
    )
})
