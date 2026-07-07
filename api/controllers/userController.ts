import { APIResponse } from '@playwright/test'
import { BaseApi } from '../client/ApiClient'
import { DeleteFormData, LogInFormData, UserApi } from '../../types/forms'

export class UserController extends BaseApi {
    protected verifyLoginEndpoint: string = '/verifyLogin'
    protected deleteAccountEndpoint: string = '/deleteAccount'
    protected updateAccountEndPoint: string = '/updateAccount'
    protected getUserDetailByEmailEndPoint: string = '/getUserDetailByEmail'
    protected createAccountEndpoint: string = '/createAccount'

    async login(data?: Partial<LogInFormData>): Promise<APIResponse> {
        const response = await this.post(this.verifyLoginEndpoint, data)
        return response
    }

    async deleteToVerifyLogin(): Promise<APIResponse> {
        const response = await this.delete(this.verifyLoginEndpoint)
        return response
    }

    async createUser(data?: UserApi): Promise<APIResponse> {
        const response = await this.post(this.createAccountEndpoint, data)
        return response
    }

    async deleteUser(data?: Partial<DeleteFormData>): Promise<APIResponse> {
        const response = await this.delete(this.deleteAccountEndpoint, data)
        return response
    }

    async updateUserAccount(data?: Partial<UserApi>): Promise<APIResponse> {
        const response = await this.put(this.updateAccountEndPoint, data)
        return response
    }

    async getUserAccountDetailByEmail(email?: string): Promise<APIResponse> {
        const response = await this.get(this.getUserDetailByEmailEndPoint, {
            email,
        })
        return response
    }
}
