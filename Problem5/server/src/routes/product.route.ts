import { Router } from 'express'
import {
  createNewProductController,
  deleteProductController,
  getAllProductController,
  getProductWithIdController,
  updateProductController
} from '~/controllers/product.controller'
import { createProductValidator, productIdValidator, updateProductValidator } from '~/middlewares/product.middlewares'
import { accessTokenValidator, userIdValidator } from '~/middlewares/user.middlewares'
import { wrapAsync } from '~/utils/handler'
import { validate } from '~/utils/validation'

const productRoute = Router()

productRoute.post(
  '/create-new-a-product',
  validate(userIdValidator),
  validate(accessTokenValidator),
  validate(createProductValidator),
  wrapAsync(createNewProductController)
)
productRoute.get(
  '/get-all-product',
  validate(userIdValidator),
  validate(accessTokenValidator),
  wrapAsync(getAllProductController)
)
productRoute.get(
  '/get-product/:id',
  validate(userIdValidator),
  validate(accessTokenValidator),
  wrapAsync(getProductWithIdController)
)
productRoute.put(
  '/update-product/:id',
  validate(productIdValidator),
  validate(updateProductValidator),
  wrapAsync(updateProductController)
)
productRoute.delete('/delete-product/:id', validate(productIdValidator), wrapAsync(deleteProductController))

export default productRoute
