import express from 'express'
import { createBrand, deleteBrandById, getBrands, updateBrandById } from '~/controllers/brandController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.put('/:brandId', [verifyAccessToken, isAdmin], updateBrandById)
router.delete('/:brandId', [verifyAccessToken, isAdmin], deleteBrandById)
router.post('/', [verifyAccessToken, isAdmin], createBrand)
router.get('/', getBrands)

export default router