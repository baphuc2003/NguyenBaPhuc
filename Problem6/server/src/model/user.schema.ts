import { ObjectId } from 'mongodb'

interface IUser {
  _id?: ObjectId
  name: string
  point?: number
  email: string
  password: string
  created_at?: Date
  update_at?: Date
}

export class User {
  _id?: ObjectId
  name: string
  point?: number
  email: string
  password: string
  created_at?: Date
  update_at?: Date

  constructor(user: IUser) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name
    this.point = user.point || 0
    this.email = user.email
    this.password = user.password
    this.created_at = user.created_at || date
    this.update_at = user.update_at || date
  }
}
