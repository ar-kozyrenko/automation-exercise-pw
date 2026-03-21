import { Page, Locator } from '@playwright/test'

export class SignUpPage {
    accountInfoHeading: Locator
    mrRadio: Locator
    name: Locator
    password: Locator
    dateOfBirth: {
        day: Locator
        month: Locator
        year: Locator
    }
    newsletterCheckBox: Locator
    specialOffersCheckBox: Locator
    firstName: Locator
    lastName: Locator
    company: Locator
    address: Locator
    address2: Locator
    countryDropDown: Locator
    state: Locator
    city: Locator
    zipCode: Locator
    mobileNumber: Locator
    createAccountButton: Locator
    accountCreatedHeading: Locator

    constructor(page: Page) {
        this.accountInfoHeading = page.getByRole('heading', {
            name: 'Enter Account Information',
        })
        this.mrRadio = page.getByRole('radio', { name: 'Mr.' })
        this.name = page.getByTestId('name')
        this.password = page.getByTestId('password')
        this.dateOfBirth = {
            day: page.getByTestId('days'),
            month: page.getByTestId('months'),
            year: page.getByTestId('years'),
        }
        this.newsletterCheckBox = page.getByLabel('Sign up for our newsletter!')
        this.specialOffersCheckBox = page.getByLabel(
            'Receive special offers from our partners!'
        )
        this.firstName = page.getByTestId('first_name')
        this.lastName = page.getByTestId('last_name')
        this.company = page.getByTestId('company')
        this.address = page.getByTestId('address')
        this.address2 = page.getByTestId('address2')
        this.countryDropDown = page.getByTestId('country')
        this.state = page.getByTestId('state')
        this.city = page.getByTestId('city')
        this.zipCode = page.getByTestId('zipcode')
        this.mobileNumber = page.getByTestId('mobile_number')
        this.createAccountButton = page.getByTestId('create-account')
        this.accountCreatedHeading = page.getByTestId('account-created')
    }
}
