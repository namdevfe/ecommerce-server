import asyncHandler from 'express-async-handler'
import productCategoryService from '~/services/productCategory'

const createCategory = asyncHandler(async(req, res) => {
  const title = req.body.title
  if (!title) throw new Error('Missing inputs')
  const response = await productCategoryService.createCategory(req.body)
  return res.status(200).json({
    success: response ? true : false,
    message: response ? 'Created successfully' : 'Create new failed',
    data: response
  })
})

const getCategories = asyncHandler(async(req, res) => {
  const categories = await productCategoryService.getCategories()
  return res.status(200).json({
    success: categories ? true : false,
    message: categories ? 'Success' : 'Failed',
    categories
  })
})

const updateCategoryById = asyncHandler(async(req, res) => {
  const { productCategoryId } = req.params
  const { title } = req.body
  if (!title) throw new Error('Missing inputs')
  const data = await productCategoryService.updateCategoryById(productCategoryId, req.body)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? `Updated product category with id=${productCategoryId} is successfully` : 'Update failed',
    data
  })
})

const deleteCategoryById = asyncHandler(async(req, res) => {
  const { productCategoryId } = req.params
  if (!productCategoryId) throw new Error('Require product category id')
  const data = await productCategoryService.deleteCategoryById(productCategoryId)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? `Deleted product category with id=${productCategoryId} is successfully` : 'Delete failed',
    data
  })
})

export {
  createCategory,
  getCategories,
  updateCategoryById,
  deleteCategoryById
}