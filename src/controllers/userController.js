import asyncHandler from 'express-async-handler'
import userService from '~/services/userService'

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body

  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    })
  }

  const response = await userService.register(req.body)

  return res.status(201).json(response)
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    })
  }

  const response = await userService.login(req.body)

  return res.status(200).json(response)
})

export { register, login }