import userService from '~/services/user.services'
import { Request, Response } from 'express'
import { User } from '~/model/user.schema'

export const registerController = async (req: Request, res: Response) => {
  const result = await userService.register(req.body)
  return res.status(200).json({
    message: 'Register a new user successfully!',
    result
  })
}

export const loginController = async (req: Request, res: Response) => {
  const { _id } = req.user as User
  const result = await userService.login(_id?.toString() as string)
  return res.status(200).json({
    message: 'Login successfully!',
    result
  })
}
