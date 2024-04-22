import express from 'express'
import { createBlog, deleteBlog, dislikeBlog, getBlogById, getBlogs, likeBlog, updateBlog } from '~/controllers/blogController'
import { isAdmin } from '~/middlewares/verifyRoleMiddleware'
import { verifyAccessToken } from '~/middlewares/verifyTokenMiddleware'

const router = express.Router()

router.put('/like/:blogId', [verifyAccessToken], likeBlog)
router.put('/dislike/:blogId', [verifyAccessToken], dislikeBlog)
router.put('/:blogId', [verifyAccessToken, isAdmin], updateBlog)
router.delete('/:blogId', [verifyAccessToken, isAdmin], deleteBlog)
router.get('/:blogId', getBlogById)
router.post('/', [verifyAccessToken, isAdmin], createBlog)
router.get('/', getBlogs)

export default router