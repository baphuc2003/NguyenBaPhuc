import { ObjectId } from 'mongodb'
import { Gender, RoleOfUser, StatusActivity } from '~/constants/enum'
export interface IUser {
  _id?: ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
  role?: RoleOfUser
  numberPhone?: string
  birthDay?: string
  sex: Gender
  city?: string
  avatar?: string
  emailVerifyToken?: string
  forgotPasswordToken?: string
  created?: Date
}

export class User {
  _id?: ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
  role?: RoleOfUser
  numberPhone?: string
  birthDay?: string
  sex: Gender
  city?: string
  avatar?: string
  emailVerifyToken?: string
  forgotPasswordToken?: string
  created?: Date

  constructor(user: IUser) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
    this.password = user.password
    this.role = user.role || RoleOfUser.USER
    this.numberPhone = user.numberPhone || ''
    this.birthDay = user.birthDay || ''
    this.sex = user.sex
    this.city = user.city || ''
    this.avatar = user.avatar ?? ''
    this.emailVerifyToken = user.emailVerifyToken || ''
    this.forgotPasswordToken = user.forgotPasswordToken || ''
    this.created = user.created || date
  }
}
