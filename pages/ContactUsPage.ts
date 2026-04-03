import { Page, Locator } from '@playwright/test'
import { ContactUsFormData } from '../types/forms'
import path from 'path'

export class ContactUsPage {
    getInTouchTitle: Locator
    nameInput: Locator
    emailInput: Locator
    subjectInput: Locator
    messageInput: Locator
    submitButton: Locator
    fileInput: Locator
    successMessage: Locator
    homeButton: Locator

    constructor(page: Page) {
        this.getInTouchTitle = page.getByRole('heading', {
            name: 'Get In Touch',
        })
        this.nameInput = page.getByTestId('name')
        this.emailInput = page.getByTestId('email')
        this.subjectInput = page.getByTestId('subject')
        this.messageInput = page.getByTestId('message')
        this.submitButton = page.getByTestId('submit-button')
        this.fileInput = page.locator('input[type = "file"]')
        this.successMessage = page.locator('.contact-form .alert-success')
        this.homeButton = page.locator('.btn-success')
    }

    async fillContactForm(data: ContactUsFormData): Promise<void> {
        await this.nameInput.fill(data.name)
        await this.emailInput.fill(data.email)
        await this.subjectInput.fill(data.subject)
        await this.messageInput.fill(data.message)
    }

    async uploadImg(): Promise<void> {
        await this.fileInput.setInputFiles(
            path.join(__dirname, '..', 'tests', 'data', 'image.jpg')
        )
    }

    async clickSubmitButton(): Promise<void> {
        await this.submitButton.click()
    }

    async clickHomeButton(): Promise<void> {
        await this.homeButton.click()
    }
}
