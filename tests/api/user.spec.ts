import { test, expect } from '../../fixtures/baseFixture'
import {
    generateEmail,
    generateFirstName,
    generateLastName,
    generatePassword,
} from '../../test-data/general.test-data'
import { createUserApi } from '../../test-data/register-user.data'
import { LogInFormData, UserApi } from '../../types/forms'

test.describe('User - positive', () => {
    test('POST To Verify Login with valid details', async ({
        apiManager,
        registeredUser,
    }) => {
        const response = await apiManager.user.login(registeredUser.credentials)
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(200)
        expect(responseJSON.message).toBe('User exists!')
    })
    test('POST To Create/Register User Account', async ({ apiManager }) => {
        const signUpdata: UserApi = createUserApi()
        const credentials: LogInFormData = {
            email: signUpdata.email,
            password: signUpdata.password,
        }
        const response = await apiManager.user.createUser(signUpdata)
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(201)
        expect(responseJSON.message).toBe('User created!')
        const deleteUserResponse = await apiManager.user.deleteUser(credentials)
        expect(deleteUserResponse.status()).toBe(200)
    })
    test('DELETE METHOD To Delete User Account', async ({
        apiManager,
        registeredUser,
    }) => {
        const response = await apiManager.user.deleteUser(
            registeredUser.credentials
        )
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(200)
        expect(responseJSON.message).toBe('Account deleted!')
    })
    test('PUT METHOD To Update User Account', async ({
        apiManager,
        registeredUser,
    }) => {
        const updateData: UserApi = {
            ...registeredUser.data,
            firstname: generateFirstName(),
            lastname: generateLastName(),
        }
        const response = await apiManager.user.updateUserAccount(updateData)
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(200)
        expect(responseJSON.message).toBe('User updated!')
        const updatedUserResponse =
            await apiManager.user.getUserAccountDetailByEmail(
                registeredUser.data.email
            )
        expect(updatedUserResponse.status()).toBe(200)
        const updatedUserResponseJSON = await updatedUserResponse.json()
        expect(updatedUserResponseJSON.user.first_name).toBe(
            updateData.firstname
        )
        expect(updatedUserResponseJSON.user.last_name).toBe(updateData.lastname)
    })
    test('GET user account detail by email', async ({
        apiManager,
        registeredUser,
    }) => {
        const response = await apiManager.user.getUserAccountDetailByEmail(
            registeredUser.data.email
        )
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(200)
        expect(responseJSON.user.email).toBe(registeredUser.data.email)
    })
})

test.describe('User - negative', () => {
    test('POST To Verify Login without email parameter', async ({
        apiManager,
    }) => {
        const logInPassword = generatePassword()
        const response = await apiManager.user.login({
            password: logInPassword,
        })
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(400)
        expect(responseJSON.message).toBe(
            'Bad request, email or password parameter is missing in POST request.'
        )
    })
    test('DELETE To Verify Login', async ({ apiManager }) => {
        const response = await apiManager.user.deleteToVerifyLogin()
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(405)
        expect(responseJSON.message).toBe(
            'This request method is not supported.'
        )
    })
    test('POST To Verify Login with invalid details', async ({
        apiManager,
    }) => {
        const notRegisteredData = {
            email: generateEmail(),
            password: generatePassword(),
        }
        const response = await apiManager.user.login(notRegisteredData)
        expect(response.status()).toBe(200)
        const responseJSON = await response.json()
        expect(responseJSON.responseCode).toBe(404)
        expect(responseJSON.message).toBe('User not found!')
    })
})
