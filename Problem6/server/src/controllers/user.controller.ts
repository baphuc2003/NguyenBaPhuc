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
    message: `User have login successfully!`,
    user_id: _id,
    result
  })
}

export const getListUserController = async (req: Request, res: Response) => {
  const result = await userService.getListUser()
  return res.status(200).json({
    message: 'Get list user successfully!',
    result
  })
}

export const updatePointController = async (req: Request, res: Response) => {
  const user_id = req.headers.user_id
  const point = req.body.point
  const result = await userService.updatePointUser(user_id as string, point)
  return res.status(200).json({
    message: 'Update point of user successfully',
    result
  })
}
