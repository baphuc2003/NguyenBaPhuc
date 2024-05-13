import { ObjectId } from 'mongodb'
import { ModelOfProduct } from '~/constants/enum'

interface IProducts {
  _id?: ObjectId
  name: string
  price: number
  description: string
  model: ModelOfProduct
  created_at?: Date
  updated_at?: Date
}

export class Products {
  _id?: ObjectId
  name: string
  price: number
  description: string
  model: ModelOfProduct
  created_at?: Date
  updated_at?: Date

  constructor(product: IProducts) {
    const date = new Date()
    this._id = product._id || new ObjectId()
    this.name = product.name
    this.price = product.price
    this.description = product.description
    this.model = product.model
    this.created_at = product.created_at || date
    this.updated_at = product.updated_at || date
  }
}
