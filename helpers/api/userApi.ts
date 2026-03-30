import { APIRequestContext } from '@playwright/test'
import {
    signUpData,
    registrationData,
} from '../../test-data/register-user.data'
import { expect } from '@playwright/test'

export async function createUser(request: APIRequestContext): Promise<void> {
    const response = await request.post(
        'https://automationexercise.com/api/createAccount',
        {
            form: {
                name: registrationData.name,
                email: signUpData.email,
                password: registrationData.password,
                firstname: registrationData.firstName,
                lastname: registrationData.lastName,
                address1: registrationData.address,
                zipcode: registrationData.zipCode,
                state: registrationData.state,
                city: registrationData.city,
                mobile_number: registrationData.mobileNumber,
            },
        }
    )
    expect(response.status()).toBe(201)
    const responseBody = await response.json()
    expect(responseBody.message).toBe('User created!')
}

export async function deleteUser(request: APIRequestContext): Promise<void> {
    const response = await request.delete(
        'https://automationexercise.com/api/deleteAccount',
        {
            form: {
                email: signUpData.email,
                password: registrationData.password,
            },
        }
    )
    expect(response.status()).toBe('200')
    const responseBody = await response.json()
    expect(responseBody.message).toBe('Account deleted!')
}
