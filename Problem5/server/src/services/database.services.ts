import { Collection, Db, MongoClient } from 'mongodb'
import { Products } from '~/model/product.schema'
import PublicKey from '~/model/publicKey.schema'
import RefreshToken from '~/model/refreshToken.schema'
import { User } from '~/model/user.schema'

export class Database {
  private static instance: Database
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(
      'mongodb+srv://product:123456789P@cluster0.mjsr5vi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    this.db = this.client.db('product_test')
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Connected to MongoDb successfully!')
    } catch (error) {
      console.log('Connect to DB failed!!')
    }
  }

  get products(): Collection<Products> {
    return this.db.collection(process.env.PRODUCT_COLLECTION as string)
  }

  get publicKey(): Collection<PublicKey> {
    return this.db.collection(process.env.PUBLIC_KEY as string)
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.USER_COLLECTION as string)
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.REFRESH_TOKEN as string)
  }
}

const database = Database.getInstance()
export default database
