import { APIRequestContext } from '@playwright/test'
import { BrandController } from '../api/controllers/brandController'
import { ProductController } from '../api/controllers/productController'
import { UserController } from '../api/controllers/userController'

export class APIManager {
    brand: BrandController
    product: ProductController
    user: UserController

    constructor(request: APIRequestContext) {
        this.brand = new BrandController(request)
        this.product = new ProductController(request)
        this.user = new UserController(request)
    }
}
