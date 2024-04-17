import express from 'express'
import {
  register,
  login,
  getProfile,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers
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

export default router