import { Router } from 'express'
import multer from 'multer'
import configUpload from '../../../../config/upload'
import { CreateProductController } from '../../../../modules/products/useCases/CreateProducts/createProductsController'
import { DeleteProductController } from '../../../../modules/products/useCases/deleteProducts/deleteProductsController'
import { ListAllProductsController } from '../../../../modules/products/useCases/listAllProducts/listAllProductsController'
import { UpdateProductControllers } from '../../../../modules/products/useCases/updateProducts/updateProductsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const products = Router()

const product = multer(configUpload.upload('./temp/products'))

const createProductsControllers = new CreateProductController()
const listAllProductsController = new ListAllProductsController()
const updateProductsController = new UpdateProductControllers()
const deleteProductsController = new DeleteProductController()

products.post(
  '/create',
  ensureAuthenticated,
  ensureAdmin,
  // celebrate({
  //   [Segments.BODY]: {
  //     title: Joi.string().required(),
  //     description: Joi.string().required(),
  //     price: Joi.number(),
  //     quantity: Joi.number().required()
  //   }
  // }),
  product.single('prduct_image'),
  createProductsControllers.handle
)

products.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listAllProductsController.handle
)

products.put(
  '/update/:id',
  ensureAuthenticated,
  ensureAdmin,
  product.single('prduct_image'),
  updateProductsController.handle
)

products.delete(
  '/delete/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteProductsController.handle
)
export { products }
