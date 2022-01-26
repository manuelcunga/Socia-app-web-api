import { Router } from 'express'
import { AddProductToCartController } from '../../../../modules/cart/useCases/addProductToCart/AddProductToCartController'
import { ListCartByUserController } from '../../../../modules/cart/useCases/listCartByUser/listCartByUserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const cart = Router()
const addCartToProductController = new AddProductToCartController()
const listCartbyUserController = new ListCartByUserController()

cart.post('/',
  ensureAuthenticated,
  addCartToProductController.handle)

cart.get('/lists',
  ensureAuthenticated,
  listCartbyUserController.handle
)

export { cart }
