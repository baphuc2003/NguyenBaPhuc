import { Router } from 'express'
import {
  createNewProductController,
  deleteProductController,
  getAllProductController,
  getProductWithIdController,
  updateProductController
} from '~/controllers/product.controller'
import { createProductValidator, productIdValidator, updateProductValidator } from '~/middlewares/product.middlewares'
import { validate } from '~/utils/validation'

const productRoute = Router()

productRoute.post('/create-new-a-product', validate(createProductValidator), createNewProductController)
productRoute.get('/get-all-product', getAllProductController)
productRoute.get('/get-product/:id', getProductWithIdController)
productRoute.put(
  '/update-product/:id',
  validate(productIdValidator),
  validate(updateProductValidator),
  updateProductController
)
productRoute.delete('/delete-product/:id', validate(productIdValidator), deleteProductController)

export default productRoute
