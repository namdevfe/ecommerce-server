import express from 'express'
import { register, login, getProfile, refreshToken, logout } from '~/controllers/userController'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refreshToken)

router.post('/logout', logout)
router.use(verifyAccessToken)
router.get('/profile', getProfile)

export default router