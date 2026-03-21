import { Page } from '@playwright/test'
import { DeleteAccountPage } from '../pages/DeleteAccountPage'
import { LoginPage } from '../pages/LoginPage'
import { NavBar } from '../pages/NavBar'
import { SignUpPage } from '../pages/SignUpPage'
import { BasePage } from './BasePage'

export class PageManager {
    deleteAccountPage: DeleteAccountPage
    loginPage: LoginPage
    navBar: NavBar
    signUpPage: SignUpPage
    basePage: BasePage

    constructor(page: Page) {
        this.deleteAccountPage = new DeleteAccountPage(page)
        this.loginPage = new LoginPage(page)
        this.navBar = new NavBar(page)
        this.signUpPage = new SignUpPage(page)
        this.basePage = new BasePage(page)
    }
}
