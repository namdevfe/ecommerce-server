import express from 'express'
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  updateCategoryById
} from '~/controllers/productCategoryController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.get('/', getCategories)
router.post('/', [verifyAccessToken, isAdmin], createCategory)
router.put('/:productCategoryId', [verifyAccessToken, isAdmin], updateCategoryById)
router.delete('/:productCategoryId', [verifyAccessToken, isAdmin], deleteCategoryById)

export default router