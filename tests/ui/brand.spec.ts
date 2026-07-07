import { test, expect } from '../../fixtures/baseFixture'

test(
    'View & Cart Brand Products',
    { tag: '@regression' },
    async ({ pageManager }) => {
        const brands = ['Polo', 'H&M']

        async function assertBrandPageAndProductBrand(
            brand: string
        ): Promise<void> {
            await pageManager.sideBar.clickBrandTitle(brand)
            await expect(pageManager.brandPage.title).toContainText(
                `Brand - ${brand} Products`
            )
            await pageManager.brandPage.productSection.clickViewProductLink(0)
            const brandValue =
                await pageManager.productsDetailsPage.getDetailsValueByLabel(
                    'Brand'
                )
            expect(brandValue).toBe(brand)
        }
        await pageManager.basePage.openPage('/')
        await pageManager.navBar.clickProductsButton()
        await expect(pageManager.sideBar.brandsHeading).toBeVisible()

        for (const brand of brands) {
            await assertBrandPageAndProductBrand(brand)
        }
    }
)
