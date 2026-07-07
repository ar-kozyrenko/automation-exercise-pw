import { APIResponse } from '@playwright/test'
import { BaseApi } from '../client/ApiClient'

export class BrandController extends BaseApi {
    protected brandListEndpoint: string = '/brandsList'

    async getAllBrandsList(): Promise<APIResponse> {
        const response = await this.get(this.brandListEndpoint)
        return response
    }

    async putToAllBrandsList(): Promise<APIResponse> {
        const response = await this.put(this.brandListEndpoint)
        return response
    }
}
