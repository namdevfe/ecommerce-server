/* eslint-disable no-async-promise-executor */
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
      const { role, password, ...userData } = response.toObject()
      resolve({
        success: true,
        message: 'Login is successfully',
        data: userData
      })
    } else {
      throw new Error('Invalid credentials')
    }
  } catch (error) {
    reject(error)
  }
})

const userService = {
  register,
  login
}

export default userService