import { ValidationChain, checkSchema } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { ErrorWithStatus } from '~/model/errors'
import { ModelOfProduct } from '~/constants/enum'
import database from '~/services/database.services'
import { ObjectId } from 'mongodb'

export const createProductValidator = checkSchema(
  {
    name: {
      isString: true,
      custom: {
        options: (value) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 422,
              message: "Name of product isn't empty!"
            })
          }
          return true
        }
      }
    },
    price: {
      custom: {
        options: (value) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 422,
              message: "Price of product isn't empty!"
            })
          }
          return true
        }
      }
    },
    description: {
      custom: {
        options: (value) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 422,
              message: "Description of product isn't empty!"
            })
          }
          return true
        }
      }
    },
    model: {
      custom: {
        options: (value: string) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 422,
              message: "Model of product isn't empty!"
            })
          }
          const arrModel: string[] = Object.values(ModelOfProduct)
          let isNotExist = true
          for (let i = 0; i < arrModel.length; i++) {
            if (arrModel[i].toLowerCase() == value.toLowerCase()) {
              isNotExist = false
            }
          }
          if (isNotExist) {
            throw new ErrorWithStatus({
              status: 422,
              message: 'Size of product invalid'
            })
          }

          return true
        }
      }
    }
  },
  ['body']
)

export const updateProductValidator = checkSchema(
  {
    name: {
      isString: true,
      custom: {
        options: (value) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 422,
              message: "Name of product isn't empty!"
            })
          }
          return true
        }
      }
    },
    price: {
      custom: {
        options: (value) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 422,
              message: "Price of product isn't empty!"
            })
          }
          return true
        }
      }
    },
    description: {
      custom: {
        options: (value) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 422,
              message: "Description of product isn't empty!"
            })
          }
          return true
        }
      }
    },
    model: {
      custom: {
        options: (value: string) => {
          if (!value) {
            throw new ErrorWithStatus({
              status: 422,
              message: "Model of product isn't empty!"
            })
          }
          const arrModel: string[] = Object.values(ModelOfProduct)
          let isNotExist = true
          for (let i = 0; i < arrModel.length; i++) {
            if (arrModel[i].toLowerCase() == value.toLowerCase()) {
              isNotExist = false
            }
          }
          if (isNotExist) {
            throw new ErrorWithStatus({
              status: 422,
              message: 'Size of product invalid'
            })
          }

          return true
        }
      }
    }
  },
  ['body']
)

export const productIdValidator = checkSchema(
  {
    id: {
      custom: {
        options: async (value, { req }) => {
          const product = await database.products.findOne({
            _id: new ObjectId(value)
          })

          if (!product) {
            throw new ErrorWithStatus({
              status: 401,
              message: 'Not found the product'
            })
          }
          return true
        }
      }
    }
  },
  ['body', 'params']
)
