import e, { Request, Response, NextFunction } from 'express'
import productService from '~/services/product.services'

export const createNewProductController = async (req: Request, res: Response) => {
  const result = await productService.createNewProduct(req.body)
  return res.status(200).json({
    result
  })
}

export const getAllProductController = async (req: Request, res: Response) => {
  const result = await productService.getAllProduct()
  return res.status(200).json({
    message: 'Get all product successfully',
    result
  })
}

export const getProductWithIdController = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await productService.getProductId(id)
  return res.status(200).json({
    message: 'Get product with id successfully',
    result
  })
}

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await productService.updateProduct(id, req.body)
  return res.status(200).json({
    message: 'Update product with id successfully',
    result
  })
}

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await productService.deleteProductController(id)
  return res.status(200).json({
    message: 'Deelete product with id successfully',
    result
  })
}
