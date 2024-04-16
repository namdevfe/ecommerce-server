/* eslint-disable no-async-promise-executor */
import { generateAccessToken, generateRefreshToken } from '~/middlewares/jwtMiddleware'
import User from '~/models/user'

// Register
const register = ({ email, password, phoneNumber, firstName, lastName }) => new Promise(async (resolve, reject) => {
  try {
    // Find if user email in database
    const isEmailExist = await User.findOne({ email })

    // Check email
    if (isEmailExist) {
      throw new Error('Email already used')
    } else {
      const userData = await User.create({ email, password, phoneNumber, firstName, lastName })
      // return res.status(200).json({
      //   success: !!userData ? true : false,
      //   message: !!userData ? 'Register is successfully' : 'Something went wrong'
      // })

      resolve({
        success: !!userData ? true : false,
        message: !!userData ? 'Register is successfully' : 'Something went wrong'
      })
    }
  } catch (error) {
    reject(error)
  }
})

// Login
const login = ({ email, password }) => new Promise(async (resolve, reject) => {
  try {
    const response = await User.findOne({ email })
    if (!!response && await response.isCorrectPassword(password)) {
      // eslint-disable-next-line no-unused-vars
      const { role, password, _id, refreshToken: refreshTokenDB, ...userData } = response.toObject()
      const accessToken = generateAccessToken(_id, role)
      const refreshToken = generateRefreshToken(_id)

      // Save refreshToken to database
      await User.findByIdAndUpdate(_id, { refreshToken }, { new: true })

      resolve({
        success: true,
        message: 'Login is successfully',
        accessToken,
        refreshToken,
        data: userData
      })
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (error) {
    reject(error)
  }
})

// Get profile
const getUserProfile = (userId) => new Promise(async (resolve, reject) => {
  try {
    const response = await User.findById(userId).select('-refreshToken -password -role')
    resolve({
      success: !!response ? true : false,
      message: !!response ? 'Success' : 'User not found',
      data: response || null
    })
  } catch (error) {
    reject(error)
  }
})

// Check refresh token
const checkRefreshToken = (userId, refreshToken) => new Promise(async (resolve, reject) => {
  try {
    const response = await User.findOne({ _id: userId, refreshToken })
    resolve({
      success: !!response ? true : false,
      message: !!response ? 'Success' : 'Invalid refresh token',
      data: !!response ? response : null
    })
  } catch (error) {
    reject(error)
  }
})

// logout
const logout = (refreshToken) => new Promise(async (resolve, reject) => {
  try {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: '' }, { new: true })
    resolve({
      success: true,
      message: 'Logout is successfully'
    })
  } catch (error) {
    reject(error)
  }
})

const userService = {
  register,
  login,
  getUserProfile,
  checkRefreshToken,
  logout
}

export default userService