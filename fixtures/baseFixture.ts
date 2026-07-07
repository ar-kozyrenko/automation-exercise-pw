import { test as base } from '@playwright/test'
import { PageManager } from '../base/PageManager'
import { APIManager } from '../base/APIManager'
import { LogInFormData, UserApi } from '../types/forms'
import { createUserApi } from '../test-data/register-user.data'

type MyFixtures = {
    pageManager: PageManager
    apiManager: APIManager
    registeredUser: { data: UserApi; credentials: LogInFormData }
}

export const test = base.extend<MyFixtures>({
    pageManager: async ({ page }, use) => {
        await page.route('**/*doubleclick*', (route) => route.abort())
        await page.route('**/*googlesyndication*', (route) => route.abort())
        await page.route('**/*googleads*', (route) => route.abort())
        await page.route('**/*adsbygoogle*', (route) => route.abort())

        const pageManager = new PageManager(page)
        await use(pageManager)
    },
    apiManager: async ({ request }, use) => {
        const apiManager = new APIManager(request)
        await use(apiManager)
    },
    registeredUser: async ({ apiManager }, use) => {
        const data = createUserApi()
        const credentials = { email: data.email, password: data.password }
        await apiManager.user.createUser(data)

        await use({ data, credentials })

        await apiManager.user.deleteUser(credentials).catch(() => {})
    },
})

export { expect } from '@playwright/test'
