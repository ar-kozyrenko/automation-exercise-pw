import { APIRequestContext, APIResponse } from '@playwright/test'

export class BaseApi {
    protected request: APIRequestContext
    protected baseURL: string = `${process.env.BASE_URL || ''}/api`

    constructor(request: APIRequestContext) {
        this.request = request
    }

    protected async get(
        endpoint: string,
        params?: Record<string, any>
    ): Promise<APIResponse> {
        return this.request.get(`${this.baseURL}${endpoint}`, {
            headers: await this.getHeaders(),
            params,
        })
    }

    protected async post(
        endpoint: string,
        form?: Record<string, any>
    ): Promise<APIResponse> {
        return this.request.post(`${this.baseURL}${endpoint}`, {
            headers: await this.getHeaders(),
            form,
        })
    }

    protected async put(
        endpoint: string,
        form?: Record<string, any>
    ): Promise<APIResponse> {
        return this.request.put(`${this.baseURL}${endpoint}`, {
            headers: await this.getHeaders(),
            form,
        })
    }

    protected async delete(
        endpoint: string,
        form?: Record<string, string>
    ): Promise<APIResponse> {
        return this.request.delete(`${this.baseURL}${endpoint}`, {
            headers: await this.getHeaders(),
            form,
        })
    }

    protected async getHeaders(): Promise<Record<string, string>> {
        return {
            Accept: 'application/json',
        }
    }
}
