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

const getProducts = asyncHandler(async(query) => {
  // Build query
  const queryObj = { ...query }
  const excludedFields = ['page', 'sort', 'limit', 'fields']
  excludedFields.forEach(key => delete queryObj[key])

  // Format operators correct in MongoDB
  let queryString = JSON.stringify(queryObj)
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
  let formatedQueries = JSON.parse(queryString)

  // Filtering
  if (queryObj?.title) {
    formatedQueries.title = {
      $regex: queryObj.title,
      $options: 'i'
    }
  }

  let queryCommand = Product.find(formatedQueries)

  // Sorting
  if (query.sort) {
    const sortBy = query.sort.split(',').join(' ')
    queryCommand = queryCommand.sort(sortBy)
  }

  // Get fields expected
  if (query.fields) {
    const fields = query.fields.split(',').join(' ')
    queryCommand = queryCommand.select(fields)
  }

  // Pagination
  const LIMIT_PRODUCTS = 2
  const limit = Number(query.limit) || LIMIT_PRODUCTS
  const page = Number(query.page) || 1
  const skip = (page - 1) * limit
  queryCommand.skip(skip).limit(limit)

  try {
    const response = await queryCommand.exec()
    const count = await Product.find(formatedQueries).countDocuments()
    return {
      success: response ? true : false,
      message: response ? 'Success' : 'Failed',
      count,
      products: response
    }
  } catch (error) {
    throw new Error(error)
  }
})

const getProductById = asyncHandler(async(id) => {
  if (!id) throw new Error('Require product id')
  const response = await Product.findById(id)
  return response
})

const ratings = asyncHandler(async({ _id, star, comment, pid }) => {
  // Find product
  const ratingProduct = await Product.findById(pid)
  const alreadyRatingProduct = ratingProduct.ratings.find((item) => item.postedBy.toString() === _id)

  if (!!alreadyRatingProduct) {
    // Update star & comment
    await Product.updateOne({
      ratings: { $elemMatch: alreadyRatingProduct }
    }, {
      $set: { 'ratings.$.star': star, 'ratings.$.comment': comment }
    }, {
      new: true
    })
  } else {
    // Add star & comment
    await Product.findByIdAndUpdate(pid, {
      $push: {
        ratings: {
          star,
          comment,
          postedBy: _id
        }
      }
    }, { new: true })
  }

  // Find updated product
  const updatedProduct = await Product.findById(pid)
  // Calculate sum star on ratings
  const sumStar = updatedProduct.ratings?.reduce((sum, item) => sum + Number(item.star), 0)
  const ratingCount = updatedProduct.ratings?.length
  // Calculate average total ratings
  const totalRatings = Math.round((sumStar * 10) / ratingCount) / 10

  // Assign result to updated product
  updatedProduct.totalRatings = totalRatings
  await updatedProduct.save()

  return {
    success: updatedProduct ? true : false,
    message: updatedProduct ? 'Success' : 'Failed',
    product: updatedProduct
  }
})

const productService = {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductById,
  ratings
}

export default productService
