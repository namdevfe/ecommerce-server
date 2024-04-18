import express from 'express'
import { createProduct, deleteProduct, updateProduct, getProducts, getProductById } from '~/controllers/productController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.get('/', getProducts)
router.get('/:productId', getProductById)
router.post('/', [verifyAccessToken, isAdmin], createProduct)
router.put('/:productId', [verifyAccessToken, isAdmin], updateProduct)
router.delete('/:productId', [verifyAccessToken, isAdmin], deleteProduct)


export default router