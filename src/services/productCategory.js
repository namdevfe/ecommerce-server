import asyncHandler from 'express-async-handler'
import ProductCategory from '~/models/productCategory'

const createCategory = asyncHandler(async(bodyData) => {
  const response = await ProductCategory.create(bodyData)
  return response
})

const getCategories = asyncHandler(async() => {
  const response = await ProductCategory.find()
  return response
})

const updateCategoryById = asyncHandler(async(id, data) => {
  const response = await ProductCategory.findByIdAndUpdate(id, data, { new: true })
  return response
})

const deleteCategoryById = asyncHandler(async(id) => {
  const response = await ProductCategory.findByIdAndDelete(id)
  return response
})

const productCategoryService = {
  createCategory,
  getCategories,
  updateCategoryById,
  deleteCategoryById
}

export default productCategoryService