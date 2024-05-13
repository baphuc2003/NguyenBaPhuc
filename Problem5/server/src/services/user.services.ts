import { ObjectId } from 'mongodb'
import database from './database.services'
import { IUser, User } from '~/model/user.schema'
import { generateKey } from '~/utils/crypto'
import { generateToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enum'
import { hashPassword } from '~/utils/bcrypt'
import RefreshToken from '~/model/refreshToken.schema'
import PublicKey from '~/model/publicKey.schema'

class UsersServices {
  async register(payload: IUser) {
    console.log('check User ', payload)
    const user_id = new ObjectId()
    const { privateKey, publicKey } = generateKey()
    //Create email_verify_token
    const email_verify_token = generateToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.EmailVerifyToken
      },
      privateKey,
      option: {
        expiresIn: '1h',
        algorithm: 'RS256'
      }
    })
    //hash password
    const hash_password = await hashPassword(payload.password)
    //upgrade new user
    const new_user = await database.users.insertOne(
      new User({
        _id: user_id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: hash_password,
        sex: payload.sex,
        emailVerifyToken: email_verify_token
      })
    )

    //Create access_token and refresh_token
    const access_token = generateToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.AccessToken
      },
      privateKey,
      option: {
        expiresIn: '15m',
        algorithm: 'RS256'
      }
    })

    const refresh_token = generateToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey,
      option: {
        expiresIn: '30d',
        algorithm: 'RS256'
      }
    })

    try {
      // Save refresh_token and public_key
      await Promise.all([
        database.refreshToken.insertOne(
          new RefreshToken({
            user_id: user_id,
            token: refresh_token
          })
        ),
        database.publicKey.insertOne(
          new PublicKey({
            user_id: user_id,
            token: publicKey
          })
        )
      ])
    } catch (error) {
      console.log(error)
      throw new Error('Failed to save refresh token and public key')
    }

    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExist(email: string) {
    const user = await database.users.findOne({ email })
    console.log('check 150 ', user)
    return user
  }

  async login(user_id: string) {
    const { privateKey, publicKey } = generateKey()
    //Create access_token and refresh_token
    const access_token = generateToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.AccessToken
      },
      privateKey,
      option: {
        expiresIn: '15m',
        algorithm: 'RS256'
      }
    })

    const refresh_token = generateToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey,
      option: {
        expiresIn: '30d',
        algorithm: 'RS256'
      }
    })

    //update new publicKey and refreshToken
    try {
      const updatedDocuments = await Promise.all([
        database.refreshToken.findOneAndUpdate(
          { user_id: new ObjectId(user_id) },
          { $set: { token: refresh_token } },
          { returnDocument: 'after' }
        ),
        database.publicKey.findOneAndUpdate(
          { user_id: new ObjectId(user_id) },
          { $set: { token: publicKey } },
          { returnDocument: 'after' }
        )
      ])
    } catch (error) {
      console.log(error)
    }

    //return access_token and refresh_token
    return {
      access_token,
      refresh_token
    }
  }
}

const userService = new UsersServices()
export default userService
