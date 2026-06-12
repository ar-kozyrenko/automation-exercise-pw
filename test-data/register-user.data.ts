import {
    SignUpFormData,
    RegistrationFormData,
    Country,
    UserApi,
} from '../types/forms'
import {
    generateAddress,
    generateBirthDate,
    generateCity,
    generateCompanyName,
    generateEmail,
    generateFirstName,
    generateLastName,
    generateMobileNumber,
    generatePassword,
    generateSecondaryAddress,
    generateState,
    generateUserName,
    generateZipCode,
} from './general.test-data'

export function generateSignUpData(): SignUpFormData {
    return {
        name: generateUserName(),
        email: generateEmail(),
    }
}

export function generateRegistrationData(
    overrides: Partial<RegistrationFormData> = {}
): RegistrationFormData {
    return {
        title: 'Mr.',
        name: generateUserName(),
        password: generatePassword(),
        birthDate: generateBirthDate(),
        newsletter: true,
        offers: false,
        firstName: generateFirstName(),
        lastName: generateLastName(),
        company: generateCompanyName(),
        address: generateAddress(),
        address2: generateSecondaryAddress(),
        country: Country.Canada,
        state: generateState(),
        city: generateCity(),
        zipCode: generateZipCode(),
        mobileNumber: generateMobileNumber(),

        ...overrides,
    }
}
export function createUserApi(): UserApi {
    return {
        name: generateUserName(),
        email: generateEmail(),
        password: generatePassword(),
        firstName: generateFirstName(),
        lastName: generateLastName(),
        address1: generateAddress(),
        country: Country.Canada,
        zipcode: generateZipCode(),
        state: generateState(),
        city: generateCity(),
        mobileNumber: generateMobileNumber(),
    }
}
