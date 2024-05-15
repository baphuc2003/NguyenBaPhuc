import { Router } from 'express'
import {
  getListUserController,
  loginController,
  registerController,
  updatePointController
} from '~/controllers/user.controller'
import {
  accessTokenValidator,
  loginValidator,
  pointValidator,
  registerValidator,
  userIdValidator
} from '~/middlewares/user.middlewares'

import { wrapAsync } from '~/utils/handler'
import { validate } from '~/utils/validation'

const usersRouter = Router()

usersRouter.post('/register', validate(registerValidator), wrapAsync(registerController))

usersRouter.post('/login', validate(loginValidator), wrapAsync(loginController))

usersRouter.get(
  '/get-list-user',
  validate(userIdValidator),
  validate(accessTokenValidator),
  wrapAsync(getListUserController)
)

usersRouter.put(
  '/update-point',
  validate(userIdValidator),
  validate(accessTokenValidator),
  validate(pointValidator),
  wrapAsync(updatePointController)
)

export default usersRouter
