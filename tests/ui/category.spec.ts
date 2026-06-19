import { test } from '../../fixtures/baseFixture'
import { expect } from '@playwright/test'

test(
    'View Category Products',
    { tag: '@regression' },
    async ({ pageManager }) => {
        async function openSubcategoryAndVerifyPageTitle(
            category: string,
            subCategory: string
        ) {
            await pageManager.sideBar.openCategory(category)
            await pageManager.sideBar.clickSubcategory(category, subCategory)
            await expect(pageManager.categoryPage.title).toContainText(
                `${category} - ${subCategory} Products`
            )
        }
        await pageManager.basePage.openPage('/')
        await expect(pageManager.sideBar.categoryHeading).toBeVisible()
        await openSubcategoryAndVerifyPageTitle('Women', 'Dress')
        await openSubcategoryAndVerifyPageTitle('Men', 'Tshirts')
    }
)
