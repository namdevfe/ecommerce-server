import asyncHandler from 'express-async-handler'
import Order from '~/models/order'
import User from '~/models/user'
import Coupon from '~/models/coupon'

const createOrder = asyncHandler(async(userId, coupon) => {
  const user = await User.findById(userId).select('cart').populate('cart.product', 'title price')
  const products = user?.cart?.map(item => ({
    product: item.product.id,
    count: item.quantity,
    color: item.color
  }))
  let total = user?.cart?.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const createData = { products, total, orderBy: userId }
  if (coupon) {
    const selectedCoupon = await Coupon.findById(coupon)
    total = Math.round(total * (1 - selectedCoupon.discount / 100) / 1000) * 1000 || total
    createData.total = total
    createData.coupon = coupon
  }

  // Create order
  const data = await Order.create(createData)
  return data
})

const updateStatusOrder = asyncHandler(async(orderId, status) => {
  const response = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
  return response
})

const getUserOrder = asyncHandler(async(userId) => {
  const response = await Order.find({ orderBy: userId })
  return response
})

const getOrders = asyncHandler(async() => {
  const response = await Order.find()
  return response
})

const orderService = {
  createOrder,
  updateStatusOrder,
  getUserOrder,
  getOrders
}

export default orderService