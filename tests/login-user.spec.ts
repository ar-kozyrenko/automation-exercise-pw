import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'
import { createUserApi } from '../test-data/register-user.data'
import { registerUser, deleteUser } from '../helpers/api/userApi'
import { LogInFormData, UserApi } from '../types/forms'

test.describe('LogIn - positive', () => {
    let userData: UserApi
    test.beforeEach(async ({ request }) => {
        userData = createUserApi()
        await registerUser(request, userData)
    })

    test.afterEach(async ({ request }) => {
        await deleteUser(request, userData)
    })
    test(
        'Login User with correct email and password',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager }) => {
            const loginData: LogInFormData = {
                email: userData.email,
                password: userData.password,
            }
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
            await pageManager.loginPage.submitLogInForm(loginData)
            await expect(
                pageManager.navBar.getLoggedInAsUserButton(userData.name)
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
    let userData: UserApi
    test.beforeEach(async ({ request }) => {
        userData = createUserApi()
        await registerUser(request, userData)
    })

    test.afterEach(async ({ request }) => {
        await deleteUser(request, userData)
    })

    test(
        'Logout User',
        { tag: ['@smoke', '@regression'] },
        async ({ pageManager }) => {
            const loginData: LogInFormData = {
                email: userData.email,
                password: userData.password,
            }
            await pageManager.basePage.openPage('/')
            await pageManager.navBar.clickSignUpLogInButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
            await pageManager.loginPage.submitLogInForm(loginData)
            await expect(
                pageManager.navBar.getLoggedInAsUserButton(userData.name)
            ).toBeVisible()
            await pageManager.navBar.clickLogOutButton()
            await expect(pageManager.loginPage.logInHeading).toBeVisible()
        }
    )
})
