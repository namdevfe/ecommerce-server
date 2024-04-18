import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Product from '~/models/product'

const createProduct = asyncHandler(async(product) => {
  product.slug = slugify(product.title)
  const response = await Product.create(product)
  return response
})

const deleteProduct = asyncHandler(async(id) => {
  const response = await Product.findByIdAndDelete(id)
  return response
})

const updateProduct = asyncHandler(async(id, product) => {
  product.slug = slugify(product.title)
  const response = await Product.findByIdAndUpdate(id, product, { new: true })
  return response
})

const getProducts = asyncHandler(async() => {
  const response = await Product.find()
  return response
})

const getProductById = asyncHandler(async(id) => {
  if (!id) throw new Error('Require product id')
  const response = await Product.findById(id)
  return response
})

const productService = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductById
}

export default productService
