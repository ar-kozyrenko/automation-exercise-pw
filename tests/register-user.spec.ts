import { Page, test, expect } from '@playwright/test'

test.describe('User registration tests', () => {
    test(
        'Positive registration',
        { tag: ['@smoke', '@regression'] },
        async ({ page }) => {
            await page.goto('https://automationexercise.com')
            await expect(page).toHaveURL('https://automationexercise.com')
            await page.getByRole('link', { name: 'Signup / Login' }).click()
            await expect(page.getByText('New User Signup!')).toBeVisible()
            await page.getByTestId('signup-name').fill('test')
            await page.getByTestId('signup-email').fill('derketalmu@necub.com')
            await page.getByTestId('signup-button').click()
            await expect(
                page.getByRole('heading', { name: 'Enter Account Information' })
            ).toBeVisible()
        }
    )
})
