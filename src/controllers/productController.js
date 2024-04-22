import asyncHandler from 'express-async-handler'
import productService from '~/services/product'

const createProduct = asyncHandler(async(req, res) => {
  const hasData = Object.keys(req.body).length > 0
  const hasTitle = req.body.title
  if (!hasData) throw new Error('Missing inputs')
  if (hasTitle) {
    // Call create product service
    const response = await productService.createProduct(req.body)
    return res.status(200).json({
      success: response ? true : false,
      message: response ? 'Created product successfully' : 'Create product failed',
      data: response
    })
  }
})

const deleteProduct = asyncHandler(async(req, res) => {
  const { productId } = req.params
  if (!productId) throw new Error('Missing input')
  // Delete product
  const response = await productService.deleteProduct(productId)
  return res.status(200).json({
    success: response ? true : false,
    message: response ? `Delete product with id=${productId} is successfully` : 'Delete product failed'
  })
})

const updateProduct = asyncHandler(async(req, res) => {
  const { productId } = req.params
  const hasData = Object.keys(req.body).length > 0
  if (!productId && hasData) throw new Error('Missing inputs')
  const response = await productService.updateProduct(productId, req.body)
  return res.status(200).json({
    success: response ? true : false,
    message: response ? `Updated product with id=${productId} is successfully` : 'Update product failed',
    data: response
  })
})

// Filtering, Sorting, Pagination
const getProducts = asyncHandler(async(req, res) => {
  const response = await productService.getProducts(req.query)
  return res.status(200).json(response)
})

const getProductById = asyncHandler(async(req, res) => {
  const { productId } = req.params
  if (!productId) throw new Error('Missing input')
  const product = await productService.getProductById(productId)
  return res.status(200).json({
    success: product ? true : false,
    message: product ? 'Success' : 'Failed',
    product
  })
})

const ratings = asyncHandler(async(req, res) => {
  const { _id } = req.user
  const { star, pid } = req.body
  if (!star || !pid) throw new Error('Missing inputs')
  const reqData = { _id, ...req.body }
  const response = await productService.ratings(reqData)
  return res.status(200).json(response)
})

const uploadImages = asyncHandler(async(req, res) => {
  const { productId } = req.params
  if (!req.files) throw new Error('Missing inputs')
  const data = await productService.uploadImages(productId, req.files)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? 'Upload images is successfully' : 'Cannot upload images',
    data
  })
})

export {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductById,
  ratings,
  uploadImages
}