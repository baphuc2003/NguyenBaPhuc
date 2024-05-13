import { Products } from '~/model/product.schema'
import database from './database.services'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/model/errors'

class ProductServices {
  async createNewProduct(payload: Products) {
    await database.products.insertOne(
      new Products({
        name: payload.name,
        price: payload.price,
        description: payload.description,
        model: payload.model
      })
    )
    return 'Create new a product successfully!'
  }

  async getAllProduct() {
    return await database.products.find().toArray()
  }

  async getProductId(id: string) {
    const product = await database.products.findOne({
      _id: new ObjectId(id)
    })
    if (!product) {
      throw new ErrorWithStatus({
        status: 400,
        message: `Product with id ${id} isn't exist`
      })
    }
    return product
  }

  async updateProduct(id: string, payload: Products) {
    return await database.products.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...payload,
          updated_at: new Date()
        }
      },
      { returnDocument: 'after' }
    )
  }

  async deleteProductController(id: string) {
    return await database.products.deleteOne({
      _id: new ObjectId(id)
    })
  }
}

const productService = new ProductServices()
export default productService
