import { Page, Locator } from '@playwright/test'
import { SignUpFormData } from '../types/forms'

export class LoginPage {
    signUpEmail: Locator
    signUpName: Locator
    signUpButton: Locator
    signUpHeading: Locator

    constructor(page: Page) {
        this.signUpEmail = page.getByTestId('signup-email')
        this.signUpName = page.getByTestId('signup-name')
        this.signUpButton = page.getByTestId('signup-button')
        this.signUpHeading = page.getByText('New User Signup!')
    }

    async fillSignUpForm(data: SignUpFormData): Promise<void> {
        await this.signUpName.fill(data.name)
        await this.signUpEmail.fill(data.email)
        await this.signUpButton.click()
    }
}
