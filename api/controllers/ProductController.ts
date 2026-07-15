import { APIResponse } from '@playwright/test'
import { BaseApi } from '../client/apiClient'

export class ProductController extends BaseApi {
    protected productsListEndpoint: string = '/productsList'
    protected searchProductEndPoint: string = '/searchProduct'

    async getAllProductsList(): Promise<APIResponse> {
        const response = await this.get(this.productsListEndpoint)
        return response
    }

    async postToAllProductsList(): Promise<APIResponse> {
        const response = await this.post(this.productsListEndpoint)
        return response
    }

    async searchProduct(formData?: Record<string, any>): Promise<APIResponse> {
        const response = await this.post(this.searchProductEndPoint, formData)
        return response
    }
}
