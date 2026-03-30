import { Page, Locator } from '@playwright/test'
import { SignUpFormData } from '../types/forms'

export class LoginPage {
    //SignUp
    signUpEmail: Locator
    signUpName: Locator
    signUpButton: Locator
    signUpHeading: Locator

    //Login
    logInEmail: Locator
    logInPassword: Locator
    logInButton: Locator
    logInHeading: Locator

    constructor(page: Page) {
        //SignUp
        this.signUpEmail = page.getByTestId('signup-email')
        this.signUpName = page.getByTestId('signup-name')
        this.signUpButton = page.getByTestId('signup-button')
        this.signUpHeading = page.getByText('New User Signup!')

        //LogIn
        this.logInEmail = page.getByTestId('login-email')
        this.logInPassword = page.getByTestId('login-password')
        this.logInButton = page.getByTestId('login-button')
        this.logInHeading = page.getByText('Login to your account')
    }

    async submitSignUpForm(data: SignUpFormData): Promise<void> {
        await this.signUpName.fill(data.name)
        await this.signUpEmail.fill(data.email)
        await this.signUpButton.click()
    }
}
