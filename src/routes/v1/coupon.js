import express from 'express'
import { createCoupon, deleteCouponById, getCoupons, updateCouponById } from '~/controllers/couponController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.put('/:couponId', [verifyAccessToken, isAdmin], updateCouponById)
router.delete('/:couponId', [verifyAccessToken, isAdmin], deleteCouponById)
router.post('/', [verifyAccessToken, isAdmin], createCoupon)
router.get('/', getCoupons)

export default router