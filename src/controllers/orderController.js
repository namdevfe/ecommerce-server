import asyncHandler from 'express-async-handler'
import orderService from '~/services/order'

const createOrder = asyncHandler(async(req, res) => {
  const { _id } = req.user
  const { coupon } = req.body
  const response = await orderService.createOrder(_id, coupon)
  return res.status(200).json({
    success: response ? true : false,
    message: response ? 'Created new order is successfully' : 'Cannot create new order',
    data: response
  })
})

const updateStatusOrder = asyncHandler(async(req, res) => {
  const { orderId } = req.params
  const { status } = req.body
  if (!status) throw new Error('Missing status')
  const data = await orderService.updateStatusOrder(orderId, status)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? 'Updated status order is successfully' : 'Cannot update status order',
    data
  })
})

const getUserOrder = asyncHandler(async(req, res) => {
  const { _id } = req.user
  const data = await orderService.getUserOrder(_id)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? 'Success' : 'Cannot get order',
    data
  })
})

const getOrders = asyncHandler(async(req, res) => {
  const data = await orderService.getOrders()
  return res.status(200).json({
    success: data ? true : false,
    message: data ? 'Success' : 'Cannot get orders',
    data
  })
})

export {
  createOrder,
  updateStatusOrder,
  getUserOrder,
  getOrders
}