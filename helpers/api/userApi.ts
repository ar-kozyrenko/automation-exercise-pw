import { APIRequestContext } from '@playwright/test'
import { expect } from '@playwright/test'
import { UserApi } from '../../types/forms'

export async function registerUser(
    request: APIRequestContext,
    user: UserApi
): Promise<void> {
    const response = await request.post(
        'https://automationexercise.com/api/createAccount',
        {
            form: {
                name: user.name,
                email: user.email,
                password: user.password,
                firstname: user.firstName,
                lastname: user.lastName,
                address1: user.address1,
                country: user.country,
                zipcode: user.zipcode,
                state: user.state,
                city: user.city,
                mobile_number: user.mobileNumber,
            },
        }
    )
    console.log(`User-email: ${user.email}`)
    console.log(`User-password: ${user.password}`)
    console.log(`User-name: ${user.name}`)
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    expect(responseBody.message).toBe('User created!')
}

export async function deleteUser(
    request: APIRequestContext,
    user: UserApi
): Promise<void> {
    const response = await request.delete(
        'https://automationexercise.com/api/deleteAccount',
        {
            form: {
                email: user.email,
                password: user.password,
            },
        }
    )
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    expect(responseBody.message).toBe('Account deleted!')
}
