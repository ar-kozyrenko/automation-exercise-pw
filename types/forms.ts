export type SignUpFormData = {
    name: string
    email: string
}

export type LogInFormData = {
    email: string
    password: string
}

export type DeleteFormData = {
    email: string
    password: string
}

export type BirthDate = {
    day: string
    month: string
    year: string
}
export enum Country {
    India = 'India',
    UnitedStates = 'United States',
    Canada = 'Canada',
    Australia = 'Australia',
    Israel = 'Israel',
    NewZealand = 'New Zealand',
    Singapore = 'Singapore',
}

export type RegistrationFormData = {
    title?: 'Mr.' | 'Mrs.'
    name: string
    password: string
    birthDate?: BirthDate
    newsletter?: boolean
    offers?: boolean
    firstName: string
    lastName: string
    company?: string
    address: string
    address2?: string
    country: Country
    state: string
    city: string
    zipCode: string
    mobileNumber: string
}

export type ContactUsFormData = {
    name: string
    email: string
    subject: string
    message: string
}
export type UserApi = {
    name: string
    email: string
    password: string
    firstname: string
    lastname: string
    address1: string
    country: string
    zipcode: string
    state: string
    city: string
    mobile_number: string
}

export type Expiration = {
    month: string
    year: string
}
export type PaymentFormData = {
    nameOnCard: string
    cardNumber: string
    cvc: string
    expiration: Expiration
}
