import asyncHandler from 'express-async-handler'
import BlogCategory from '~/models/blogCategory'

const createCategory = asyncHandler(async(data) => {
  const response = await BlogCategory.create(data)
  return response
})

const getCategories = asyncHandler(async() => {
  const response = await BlogCategory.find()
  return response
})

const updateCategoryById = asyncHandler(async(id, data) => {
  const response = await BlogCategory.findByIdAndUpdate(id, data, { new: true })
  return response
})

const deleteCategoryById = asyncHandler(async(id) => {
  const response = await BlogCategory.findByIdAndDelete(id)
  return response
})

const blogCategoryService = {
  createCategory,
  getCategories,
  updateCategoryById,
  deleteCategoryById
}

export default blogCategoryService