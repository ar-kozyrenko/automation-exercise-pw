export type SignUpFormData = {
    name: string
    email: string
}

export type LogInFormData = {
    email: string
    password: string
}

type BirthDate = {
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
