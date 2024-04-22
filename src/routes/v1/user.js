import express from 'express'
import {
  deleteUserByAdmin,
  forgotPassword,
  getProfile,
  getUsers,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  updateAddress,
  updateProfile,
  updateUserByAdmin
} from '~/controllers/userController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refreshToken)
router.post('/logout', logout)
router.get('/forgot-password', forgotPassword)
router.put('/reset-password', resetPassword)
router.get('/profile', verifyAccessToken, getProfile)
router.put('/profile', verifyAccessToken, updateProfile)
router.put('/address', verifyAccessToken, updateAddress)
router.put('/:uid', [verifyAccessToken, isAdmin], updateUserByAdmin)
router.delete('/', [verifyAccessToken, isAdmin], deleteUserByAdmin)
router.get('/', [verifyAccessToken, isAdmin], getUsers)

export default router