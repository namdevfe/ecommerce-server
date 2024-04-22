import asyncHandler from 'express-async-handler'
import couponService from '~/services/coupon'

// Create new coupon
const createCoupon = asyncHandler(async(req, res) => {
  const { name, expery, discount } = req.body
  if (!name || !expery || !discount) throw new Error('Missing inputs')
  const data = await couponService.createCoupon(req.body)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? 'Created new coupon is successfully' : 'Cannot create new coupon',
    data
  })
})

// Get all coupon
const getCoupons = asyncHandler(async(req, res) => {
  const coupons = await couponService.getCoupons()
  return res.status(200).json({
    success: coupons ? true : false,
    message: coupons ? 'Success' : 'Cannot get coupons',
    coupons
  })
})

// Update coupon
const updateCouponById = asyncHandler(async(req, res) => {
  const { couponId } = req.params
  if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
  const data = await couponService.updateCouponById(couponId, req.body)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? `Updated coupon with id=${couponId} is successfully` : 'Cannot update coupon',
    data
  })
})

// Delete coupon
const deleteCouponById = asyncHandler(async(req, res) => {
  const { couponId } = req.params
  const data = await couponService.deleteCouponById(couponId)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? `Deleted coupon with id=${couponId} is successfully` : 'Cannot delete coupon',
    data
  })
})

export {
  createCoupon,
  getCoupons,
  updateCouponById,
  deleteCouponById
}