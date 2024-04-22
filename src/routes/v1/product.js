import express from 'express'
import uploadCloud from '~/config/cloudinary'
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductById,
  ratings,
  uploadImages
} from '~/controllers/productController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.put('/ratings', verifyAccessToken, ratings)
router.put('/upload-images/:productId', [verifyAccessToken, isAdmin], uploadCloud.array('images', 10), uploadImages)
router.get('/:productId', getProductById)
router.post('/', [verifyAccessToken, isAdmin], createProduct)
router.put('/:productId', [verifyAccessToken, isAdmin], updateProduct)
router.delete('/:productId', [verifyAccessToken, isAdmin], deleteProduct)
router.get('/', getProducts)


export default router