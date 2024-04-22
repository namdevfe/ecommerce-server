import Brand from '~/models/brand'
import asyncHandler from 'express-async-handler'

const createBrand = asyncHandler(async(data) => {
  const response = await Brand.create(data)
  return response
})

const getBrands = asyncHandler(async() => {
  const response = await Brand.find()
  return response
})

const updateBrandById = asyncHandler(async(brandId, data) => {
  const response = await Brand.findByIdAndUpdate(brandId, data, { new: true })
  return response
})

const deleteBrandById = asyncHandler(async(brandId) => {
  const response = await Brand.findByIdAndDelete(brandId)
  return response
})

const brandService = {
  createBrand,
  getBrands,
  updateBrandById,
  deleteBrandById
}

export default brandService