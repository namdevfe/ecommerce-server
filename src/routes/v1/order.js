import express from 'express'
import { createOrder, getUserOrder, updateStatusOrder } from '~/controllers/orderController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.put('/status/:orderId', [verifyAccessToken, isAdmin], updateStatusOrder)
router.post('/', [verifyAccessToken], createOrder)
router.get('/admin', [verifyAccessToken, isAdmin], getUserOrder)
router.get('/', verifyAccessToken, getUserOrder)

export default router