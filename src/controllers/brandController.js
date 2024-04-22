import asyncHandler from 'express-async-handler'
import brandService from '~/services/brand'

// Create new brand
const createBrand = asyncHandler(async(req, res) => {
  const { title } = req.body
  if (!title) throw new Error('Missing inputs')
  const brand = await brandService.createBrand(req.body)
  return res.status(200).json({
    success: brand ? true : false,
    message: brand ? 'Created new brand is successfully' : 'Create new failed',
    brand
  })
})

// Get all brands
const getBrands = asyncHandler(async(req, res) => {
  const brands = await brandService.getBrands()
  return res.status(200).json({
    success: brands ? true : false,
    message: brands ? 'Success' : 'Fail',
    brands
  })
})

// Update brand
const updateBrandById = asyncHandler(async(req, res) => {
  const { brandId } = req.params
  if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
  const data = await brandService.updateBrandById(brandId, req.body)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? `Updated brand with id=${brandId} is successfully` : 'Update brand failed',
    data
  })
})

// Delete brand
const deleteBrandById = asyncHandler(async(req, res) => {
  const { brandId } = req.params
  const data = await brandService.deleteBrandById(brandId)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? `Deleted brand with id=${brandId} is successfully` : 'Delete brand failed',
    data
  })
})

export {
  createBrand,
  getBrands,
  updateBrandById,
  deleteBrandById
}