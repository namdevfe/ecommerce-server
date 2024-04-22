import asyncHandler from 'express-async-handler'
import Coupon from '~/models/coupon'
import { calcExperyCoupon } from '~/utils/calc'

const createCoupon = asyncHandler(async(data) => {
  // Time expery coupon
  const expery = calcExperyCoupon(data?.expery)
  const response = await Coupon.create({ ...data, expery })
  return response
})

const getCoupons = asyncHandler(async() => {
  const response = await Coupon.find().select('name expery discount')
  return response
})

const updateCouponById = asyncHandler(async(couponId, data) => {
  const expery = calcExperyCoupon(data?.expery)
  const response = await Coupon.findByIdAndUpdate(couponId, { ...data, expery }, { new: true })
  return response
})

const deleteCouponById = asyncHandler(async(couponId) => {
  const response = await Coupon.findByIdAndDelete(couponId)
  return response
})

const couponService = {
  createCoupon,
  getCoupons,
  updateCouponById,
  deleteCouponById
}

export default couponService
