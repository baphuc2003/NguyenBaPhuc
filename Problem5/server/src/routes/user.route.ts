import { Router } from 'express'
import { loginController, registerController } from '~/controllers/user.controller'
import { loginValidator, registerValidator } from '~/middlewares/user.middlewares'
import { wrapAsync } from '~/utils/handler'
import { validate } from '~/utils/validation'
const usersRouter = Router()

usersRouter.post('/register', validate(registerValidator), wrapAsync(registerController))
usersRouter.post('/login', validate(loginValidator), wrapAsync(loginController))

export default usersRouter
