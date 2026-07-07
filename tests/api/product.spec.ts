import { test, expect } from '../../fixtures/baseFixture'
import { normalizeText } from '../../helpers/text.helper'

test.describe('Products - positive', () => {
    test('Get All Products List', async ({ apiManager }) => {
        const response = await apiManager.product.getAllProductsList()
        expect(response.status()).toBe(200)
        const productsData = await response.json()

        const targetProduct = productsData.products.find(
            (product: any) => product.id === 33
        )
        expect(targetProduct).toBeDefined()
        expect(targetProduct.brand).toBe('Polo')

        expect(productsData.responseCode).toBe(200)
    })

    test('POST To Search Product', async ({ apiManager }) => {
        const searchedProduct = 'dress'
        const response = await apiManager.product.searchProduct({
            search_product: searchedProduct,
        })
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(200)

        const isItemPresent = responseJSON.products.some((product: any) =>
            normalizeText(product.name).includes(normalizeText(searchedProduct))
        )
        expect(isItemPresent).toBe(true)
    })
})

test.describe('Products - negative', () => {
    test('POST To All Products List', async ({ apiManager }) => {
        const response = await apiManager.product.postToAllProductsList()
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(405)
        expect(responseJSON.message).toBe(
            'This request method is not supported.'
        )
    })
    test('POST To Search Product without search_product parameter', async ({
        apiManager,
    }) => {
        const response = await apiManager.product.searchProduct()

        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(400)
        expect(responseJSON.message).toBe(
            'Bad request, search_product parameter is missing in POST request.'
        )
    })
})
