import asyncHandler from 'express-async-handler'
import productService from '~/services/productService'
import Product from '~/models/product'

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
  // Build query
  const queryObj = { ...req.query }
  const excludedFields = ['page', 'sort', 'limit', 'fields']
  excludedFields.forEach(key => delete queryObj[key])

  // Format operators correct in MongoDB
  let queryString = JSON.stringify(queryObj)
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  const formatedQueries = JSON.parse(queryString)

  // Filtering
  if (queryObj?.title) {
    formatedQueries.title = {
      $regex: queryObj.title,
      $options: 'i'
    }
  }

  const queryCommand = Product.find(formatedQueries)

  // Execute query
  // queryCommand.exec(async(error, response) => {
  //   if (error) throw new Error(error.message)
  //   const count = await Product.find(formatedQueries).countDocuments()
  //   return res.status(200).json({
  //     success: response ? true : false,
  //     message: response ? 'Success' : 'Failed',
  //     products: response,
  //     count
  //   })
  // })

  queryCommand
    .then(async(response) => {
      const count = await Product.find(formatedQueries).countDocuments()
      return res.status(200).json({
        success: response ? true : false,
        message: response ? 'Success' : 'Failed',
        products: response,
        count
      })
    })
    .catch(error => {
      throw new Error(error)
    })
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

export {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductById
}