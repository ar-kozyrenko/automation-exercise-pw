import { faker } from '@faker-js/faker'
import { SignUpFormData, RegistrationFormData, Country } from '../types/forms'

const name = faker.internet.username()

export const signUpData: SignUpFormData = {
    name,
    email: faker.internet.email(),
}
export const registrationData: RegistrationFormData = {
    title: 'Mr.',
    name,
    password: faker.internet.password(),
    birthDate: {
        day: String(faker.number.int({ min: 1, max: 28 })),
        month: faker.date.month(),
        year: String(faker.number.int({ min: 1960, max: 2000 })),
    },
    newsletter: true,
    offers: false,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: Country.Canada,
    state: faker.location.state(),
    city: faker.location.city(),
    zipCode: faker.location.zipCode('#####'),
    mobileNumber: faker.phone.number({ style: 'national' }),
}
