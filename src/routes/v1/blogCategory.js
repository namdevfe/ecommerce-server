import express from 'express'
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  updateCategoryById
} from '~/controllers/blogCategoryController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.get('/', getCategories)
router.post('/', [verifyAccessToken, isAdmin], createCategory)
router.put('/:blogCategoryId', [verifyAccessToken, isAdmin], updateCategoryById)
router.delete('/:blogCategoryId', [verifyAccessToken, isAdmin], deleteCategoryById)

export default router