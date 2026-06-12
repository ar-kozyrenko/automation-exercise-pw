import { Page } from '@playwright/test'
import { DeleteAccountPage } from '../pages/DeleteAccountPage'
import { LoginPage } from '../pages/LoginPage'
import { NavBar } from '../pages/components/NavBar'
import { RegisterPage } from '../pages/RegisterPage'
import { BasePage } from './BasePage'
import { ContactUsPage } from '../pages/ContactUsPage'
import { ProductsPage } from '../pages/ProductsPage'
import { ProductsDetailsPage } from '../pages/ProductsDetailsPage'
import { Footer } from '../pages/components/Footer'
import { CartPage } from '../pages/CartPage'
import { AddedToCartModal } from '../pages/components/AddedToCartModal'
import { ProductSection } from '../pages/components/ProductsSection'
import { CheckoutModal } from '../pages/components/CheckoutModal'
import { CheckoutPage } from '../pages/CheckoutPage'
import { HomePage } from '../pages/HomePage'
import { PaymentPage } from '../pages/PaymentPage'
import { OrderPlacedPage } from '../pages/OrderPlacedPage'
import { SideBar } from '../pages/components/SideBar'
import { CategoryPage } from '../pages/CategoryPage'
import { BrandPage } from '../pages/BrandPage'

export class PageManager {
    deleteAccountPage: DeleteAccountPage
    loginPage: LoginPage
    navBar: NavBar
    registerPage: RegisterPage
    basePage: BasePage
    contactUsPage: ContactUsPage
    productsPage: ProductsPage
    productsDetailsPage: ProductsDetailsPage
    footer: Footer
    cartPage: CartPage
    addedToCartModal: AddedToCartModal
    productSection: ProductSection
    checkoutModal: CheckoutModal
    checkoutPage: CheckoutPage
    homePage: HomePage
    paymentPage: PaymentPage
    orderPlacedPage: OrderPlacedPage
    sideBar: SideBar
    categoryPage: CategoryPage
    brandPage: BrandPage

    constructor(page: Page) {
        this.deleteAccountPage = new DeleteAccountPage(page)
        this.loginPage = new LoginPage(page)
        this.navBar = new NavBar(page)
        this.registerPage = new RegisterPage(page)
        this.basePage = new BasePage(page)
        this.contactUsPage = new ContactUsPage(page)
        this.productsPage = new ProductsPage(page)
        this.productsDetailsPage = new ProductsDetailsPage(page)
        this.footer = new Footer(page)
        this.cartPage = new CartPage(page)
        this.addedToCartModal = new AddedToCartModal(page)
        this.productSection = new ProductSection(page)
        this.checkoutModal = new CheckoutModal(page)
        this.checkoutPage = new CheckoutPage(page)
        this.homePage = new HomePage(page)
        this.paymentPage = new PaymentPage(page)
        this.orderPlacedPage = new OrderPlacedPage(page)
        this.sideBar = new SideBar(page)
        this.categoryPage = new CategoryPage(page)
        this.brandPage = new BrandPage(page)
    }
}
