import { Page, Locator } from '@playwright/test'
import { RegistrationFormData } from '../types/forms'

export class SignUpPage {
    accountInfoHeading: Locator
    mrRadio: Locator
    mrsRadio: Locator
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
        this.mrsRadio = page.getByRole('radio', { name: 'Mrs.' })
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
    async fillRegistrationForm(data: RegistrationFormData): Promise<void> {
        if (data.title === 'Mr.') await this.mrRadio.click()
        if (data.title === 'Mrs.') await this.mrsRadio.click()
        await this.name.fill(data.name)
        await this.password.fill(data.password)
        if (data.birthDate?.day)
            await this.dateOfBirth.day.selectOption(data.birthDate.day)
        if (data.birthDate?.month)
            await this.dateOfBirth.month.selectOption(data.birthDate.month)
        if (data.birthDate?.year)
            await this.dateOfBirth.year.selectOption(data.birthDate.year)
        if (data.newsletter) await this.newsletterCheckBox.click()
        if (data.offers) await this.specialOffersCheckBox.click()
        await this.firstName.fill(data.firstName)
        await this.lastName.fill(data.lastName)
        if (data.company) await this.company.fill(data.company)
        await this.address.fill(data.address)
        if (data.address2) await this.address2.fill(data.address2)
        await this.countryDropDown.selectOption(data.country)
        await this.state.fill(data.state)
        await this.city.fill(data.city)
        await this.zipCode.fill(data.zipCode)
        await this.mobileNumber.fill(data.mobileNumber)
    }
    async clickCreateAccountButton(): Promise<void> {
        await this.createAccountButton.click()
    }
}
