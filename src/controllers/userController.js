import asyncHandler from 'express-async-handler'
import userService from '~/services/userService'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { generateAccessToken } from '~/middlewares/jwtMiddleware'

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

  res.cookie('refreshToken', response.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

  return res.status(200).json(response)
})

const getProfile = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const response = await userService.getUserProfile(_id)
  return res.status(200).json(response)
})

const refreshToken = asyncHandler(async (req, res) => {
  // Get refresh token from cookies
  const cookies = req.cookies

  // If no there is refresh token in cookies
  if (!cookies && cookies.refreshToken) throw new Error('No refresh token in cookies')

  // Has refresh token in cookies
  // Check if refresh token is valid
  const refreshToken = cookies.refreshToken
  const jwtResponse = await jwt.verify(refreshToken, env.JWT_SECRET_KEY)

  // Compare refresh token in database
  const response = await userService.checkRefreshToken(jwtResponse?._id, refreshToken)

  return res.status(200).json({
    success: response?.success,
    newAccessToken: !!response ? generateAccessToken(jwtResponse._id, response.role) : 'Refresh token not matched'
  })
})

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies
  if (!cookies && !cookies?.refreshToken) throw new Error('No refresh token in cookies')

  // Delete refresh token in database
  const response = await userService.logout(cookies.refreshToken)

  // Delete refresh token in cookies
  res.clearCookie('refreshToken', { httpOnly: true, secure: true })

  return res.status(200).json(response)
})

export { register, login, getProfile, refreshToken, logout }
