import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'

test('Contact Us Form', async ({ pageManager, page }) => {
    // Block ads
    await page.route('**/*doubleclick*', (route) => route.abort())
    await page.route('**/*googlesyndication*', (route) => route.abort())
    await page.route('**/*googleads*', (route) => route.abort())

    // ✅ ГЛАВНОЕ — глобальный обработчик диалога
    page.on('dialog', async (dialog) => {
        await dialog.accept()
    })

    // Open page
    await pageManager.basePage.openPage('/')
    await pageManager.navBar.clickContactUsButton()

    // Verify page
    await expect(pageManager.contactUsPage.getInTouchTitle).toBeVisible()

    // Fill form
    await pageManager.contactUsPage.fillContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Hello, this is a test message',
    })

    await pageManager.contactUsPage.uploadImg()

    await page.waitForTimeout(500) // 0.5 секунды
    // ✅ ВАЖНО: обычный клик (НЕ requestSubmit)
    await pageManager.contactUsPage.clickSubmitButton()

    // ✅ Ждём именно текст (а не visible)
    await expect(pageManager.contactUsPage.successMessage).toHaveText(
        /Success/i,
        { timeout: 20000 }
    )

    // Проверяем что форма исчезла
    //  await expect(page.locator('#form-section')).not.toBeVisible()

    // Back to home
    await pageManager.contactUsPage.clickHomeButton()
    await expect(page).toHaveURL('/')
})
