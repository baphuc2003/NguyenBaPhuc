import { Products } from '~/model/product.schema'
import database from './database.services'
import { DeleteResult, InsertOneResult, ObjectId, WithId } from 'mongodb'
import { ErrorWithStatus } from '~/model/errors'

interface ProductServiceImplement {
  createNewProduct(payload: Products): Promise<InsertOneResult<Products>>
  getAllProduct(): Promise<WithId<Products>[]>
  getProductId(id: string): Promise<WithId<Products> | null>
  updateProduct(id: string, payload: Products): Promise<WithId<Products> | null>
  deleteProductController(id: string): Promise<DeleteResult>
}

class ProductServices implements ProductServiceImplement {
  public async createNewProduct(payload: Products) {
    return await database.products.insertOne(
      new Products({
        name: payload.name,
        price: payload.price,
        description: payload.description,
        model: payload.model
      })
    )
  }

  public async getAllProduct(): Promise<WithId<Products>[]> {
    return await database.products.find().toArray()
  }

  public async getProductId(id: string): Promise<WithId<Products> | null> {
    const product = await database.products.findOne({
      _id: new ObjectId(id)
    })
    if (!product) {
      throw new ErrorWithStatus({
        status: 400,
        message: `Product with id ${id} isn't exist`
      })
    }
    return product || null
  }

  public async updateProduct(id: string, payload: Products): Promise<WithId<Products> | null> {
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

  public async deleteProductController(id: string): Promise<DeleteResult> {
    return await database.products.deleteOne({
      _id: new ObjectId(id)
    })
  }
}

const productService = new ProductServices()
export default productService
