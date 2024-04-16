import asyncHandler from 'express-async-handler'
import User from '~/models/user'

const register = asyncHandler(async (req, res) => {
  // Get value register of user from client
  const { firstName, lastName, email, password, phoneNumber } = req.body

  // Case: missing input
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    })
  }

  // Case: success
  const userData = await User.create(req.body)
  return res.status(200).json({
    success: !!userData ? true : false,
    data: userData
  })
})

export { register }