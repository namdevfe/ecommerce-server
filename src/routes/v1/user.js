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
router.get('/', [verifyAccessToken, isAdmin], getUsers)
router.delete('/', [verifyAccessToken, isAdmin], deleteUserByAdmin)
router.put('/:uid', [verifyAccessToken, isAdmin], updateUserByAdmin)
router.put('/profile', verifyAccessToken, updateProfile)

export default router