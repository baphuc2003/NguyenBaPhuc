import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/model/errors'
import database from '~/services/database.services'
import userService from '~/services/user.services'
import { decodeToken } from '~/utils/jwt'
import bcrypt from 'bcrypt'

export const registerValidator = checkSchema(
  {
    firstName: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        }
      }
    },
    lastName: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        }
      }
    },
    email: {
      notEmpty: true,
      isString: true,
      isEmail: true,
      isLength: {
        options: {
          min: 3,
          max: 255
        }
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const result = await userService.checkEmailExist(value)
          if (result != null) throw new Error('This email account has been used before. Please try again!')
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 6,
          max: 255
        }
      },
      isStrongPassword: {
        options: {
          minLowercase: 1,
          minUppercase: 1,
          minLength: 6,
          minNumbers: 1,
          minSymbols: 1
        }
      }
    },
    sex: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 4,
          max: 10
        }
      }
    }
  },
  ['body']
)

export const loginValidator = checkSchema(
  {
    email: {
      notEmpty: true,
      isString: true,
      isEmail: true,
      isLength: {
        options: {
          min: 3,
          max: 255
        }
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await database.users.findOne({
            email: value
          })
          if (!user) {
            throw new Error('User not found')
          }

          const compare = bcrypt.compareSync(req.body.password, user.password)
          if (!compare) {
            //  throw new Error("Password doesn't correct")
            throw new ErrorWithStatus({ status: 422, message: 'Password bi nguu' })
          }
          req.user = user
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 6,
          max: 255
        }
      },
      custom: {
        options: async (value, { req }) => {}
      }
    }
  },
  ['body']
)

export const userIdValidator = checkSchema(
  {
    user_id: {
      custom: {
        options: async (value, { req }) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 401,
              message: 'User id is required'
            })
          }
          const user = await database.users.findOne({ _id: new ObjectId(value) })
          if (!user) {
            throw new ErrorWithStatus({
              status: 404,
              message: 'User not found!'
            })
          }
          req.user_id = value
          return true
        }
      }
    }
  },
  ['body']
)

export const accessTokenValidator = checkSchema(
  {
    authorization: {
      custom: {
        options: async (value, { req }) => {
          const user_id = req.user_id
          console.log('check 381 ', user_id)
          //get publicKey of user_id
          const publicKey = await database.publicKey.findOne({ user_id: new ObjectId(user_id) })
          if (!publicKey) {
            throw new ErrorWithStatus({
              status: 404,
              message: 'Public key not found!'
            })
          }
          if (!value) {
            throw new ErrorWithStatus({
              status: 401,
              message: 'Access token is not empty!'
            })
          }
          const token = value.split(' ')[1]
          //decoded access token
          const decoded_access_token = await decodeToken({ token: token, secretKey: publicKey.token })
          console.log('check 288 ', decoded_access_token)
          req.decoded_access_token = decoded_access_token
          return true
        }
      }
    }
  },
  ['headers']
)
