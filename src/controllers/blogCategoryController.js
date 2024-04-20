import asyncHandler from 'express-async-handler'
import blogCategoryService from '~/services/blogCategory'

const createCategory = asyncHandler(async(req, res) => {
  const title = req.body.title
  if (!title) throw new Error('Missing inputs')
  const response = await blogCategoryService.createCategory(req.body)
  return res.status(200).json({
    success: response ? true : false,
    message: response ? 'Created successfully' : 'Create new failed',
    data: response
  })
})

const getCategories = asyncHandler(async(req, res) => {
  const categories = await blogCategoryService.getCategories()
  return res.status(200).json({
    success: categories ? true : false,
    message: categories ? 'Success' : 'Failed',
    categories
  })
})

const updateCategoryById = asyncHandler(async(req, res) => {
  const { blogCategoryId } = req.params
  const { title } = req.body
  if (!title) throw new Error('Missing inputs')
  const data = await blogCategoryService.updateCategoryById(blogCategoryId, req.body)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? `Updated blog category with id=${blogCategoryId} is successfully` : 'Update failed',
    data
  })
})

const deleteCategoryById = asyncHandler(async(req, res) => {
  const { blogCategoryId } = req.params
  if (!blogCategoryId) throw new Error('Require blog category id')
  const data = await blogCategoryService.deleteCategoryById(blogCategoryId)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? `Deleted blog category with id=${blogCategoryId} is successfully` : 'Delete failed',
    data
  })
})

export {
  createCategory,
  getCategories,
  updateCategoryById,
  deleteCategoryById
}