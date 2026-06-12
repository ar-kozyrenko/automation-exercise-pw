import { faker } from '@faker-js/faker'
import { BirthDate, Expiration, PaymentFormData } from '../types/forms'

export function generateUserName(): string {
    return faker.internet.username()
}

export function generateEmail(): string {
    return faker.internet.email()
}

export function generatePassword(): string {
    return faker.internet.password()
}

export function generateBirthDate(): BirthDate {
    return {
        day: String(faker.number.int({ min: 1, max: 28 })),
        month: faker.date.month(),
        year: String(faker.number.int({ min: 1960, max: 2000 })),
    }
}

export function generateFirstName(): string {
    return faker.person.firstName()
}

export function generateLastName(): string {
    return faker.person.lastName()
}

export function generateCompanyName(): string {
    return faker.company.name()
}

export function generateAddress(): string {
    return faker.location.streetAddress()
}

export function generateSecondaryAddress(): string {
    return faker.location.secondaryAddress()
}

export function generateState(): string {
    return faker.location.state()
}

export function generateCity(): string {
    return faker.location.city()
}

export function generateZipCode(): string {
    return faker.location.zipCode('#####')
}

export function generateMobileNumber(): string {
    return faker.phone.number({ style: 'national' })
}
export function generateCardNumber(): string {
    return faker.finance.creditCardNumber()
}
export function generateCvc(): string {
    return faker.finance.creditCardCVV()
}
export function generateExpiration(): Expiration {
    const future = faker.date.future({ years: 10 })
    return {
        month: String(future.getMonth() + 1).padStart(2, '0'),
        year: String(future.getFullYear()),
    }
}
export function generatePaymentData(): PaymentFormData {
    return {
        nameOnCard: generateFirstName() + generateLastName(),
        cardNumber: generateCardNumber(),
        cvc: generateCvc(),
        expiration: generateExpiration(),
    }
}
export function generateRandomText(): string {
    return faker.lorem.sentence({ min: 3, max: 15 })
}
