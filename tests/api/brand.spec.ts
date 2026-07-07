import { test, expect } from '../../fixtures/baseFixture'

test.describe('Brands-positive', () => {
    test('Get All Brands List', async ({ apiManager }) => {
        const response = await apiManager.brand.getAllBrandsList()
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(200)

        const targetBrand = responseJSON.brands.find(
            (brand: any) => brand.brand === 'H&M'
        )
        expect(targetBrand).toBeDefined()
        expect(targetBrand.id).toBe(2)
    })
})
test.describe('Brands-negative', () => {
    test('PUT To All Brands List', async ({ apiManager }) => {
        const response = await apiManager.brand.putToAllBrandsList()
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(405)
        expect(responseJSON.message).toBe(
            'This request method is not supported.'
        )
    })
})
