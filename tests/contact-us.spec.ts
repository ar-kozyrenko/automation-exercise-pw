import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'

test(
    'Contact Us Form',
    { tag: '@regression' },
    async ({ pageManager, page }) => {
        page.on('dialog', (dialog) => dialog.accept())

        await pageManager.basePage.openPage('/')
        await pageManager.navBar.clickContactUsButton()
        await expect(pageManager.contactUsPage.getInTouchTitle).toBeVisible()
        await pageManager.contactUsPage.fillContactForm({
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Hello, this is a test message',
        })
        await pageManager.contactUsPage.uploadImg()

        // Wait until jQuery registers the submit handler on the form before clicking Submit
        await page.waitForFunction(() => {
            const form = document.querySelector('#contact-us-form') as any
            return (
                form &&
                (window as any).jQuery &&
                (window as any).jQuery._data(form, 'events')?.submit
            )
        })

        await pageManager.contactUsPage.clickSubmitButton()
        await expect(pageManager.contactUsPage.successMessage).toBeVisible({
            timeout: 10000,
        })
        await expect(pageManager.contactUsPage.successMessage).toContainText(
            'Success'
        )
        await pageManager.contactUsPage.clickHomeButton()
        await expect(page).toHaveURL('/')
    }
)
