import { test, expect } from '../../fixtures/baseFixture'

test(
    'Verify Test Cases Page',
    { tag: '@regression' },
    async ({ pageManager, page }) => {
        await pageManager.basePage.openPage('/')
        await pageManager.navBar.clickTestCasesButton()
        await expect(page).toHaveURL('/test_cases')
    }
)
