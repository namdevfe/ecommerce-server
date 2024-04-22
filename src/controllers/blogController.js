import asyncHandler from 'express-async-handler'
import blogService from '~/services/blog'

// Create new blog
const createBlog = asyncHandler(async(req, res) => {
  const { title, description, category } = req.body
  if (!title || !description || !category) throw new Error('Missing inputs')
  const blog = await blogService.createBlog(req.body)
  return res.json({
    success: blog ? true : false,
    message: blog ? 'Created new blog success' : 'Create new blog failed',
    blog
  })
})

// Get all blogs
const getBlogs = asyncHandler(async(req, res) => {
  const blogs = await blogService.getBlogs()
  return res.json({
    success: blogs ? true : false,
    message: blogs ? 'Success' : 'Something went wrongs',
    blogs
  })
})

// Get blog detail
const getBlogById = asyncHandler(async(req, res) => {
  const { blogId } = req.params
  const blogDetail = await blogService.getBlogById(blogId)
  return res.status(200).json({
    success: blogDetail ? true : false,
    message: blogDetail ? 'Success' : 'Failed',
    blog: blogDetail
  })
})

// Update blog by id
const updateBlog = asyncHandler(async(req, res) => {
  const { blogId } = req.params
  const hasData = Object.keys(req.body).length > 0
  if (!hasData) throw new Error('Missing inputs')
  const updatedBlog = await blogService.updateBlogById(blogId, req.body)
  return res.json({
    success: updatedBlog ? true : false,
    message: updatedBlog ? `Updated blog with id=${blogId} is successfully` : 'Update blog failed',
    blog: updatedBlog
  })
})

// Delete blog by id
const deleteBlog = asyncHandler(async(req, res) => {
  const { blogId } = req.params
  const deletedBlog = await blogService.deleteBlogById(blogId)
  return res.json({
    success: deletedBlog ? true : false,
    message: deletedBlog ? `Deleted blog with id=${blogId} is successfully` : 'Delete blog failed',
    blog: deleteBlog
  })
})

// Like blog
const likeBlog = asyncHandler(async(req, res) => {
  const { _id } = req.user
  const { blogId } = req.params
  if (!blogId) throw new Error('Missing inputs')
  const data = await blogService.likeBlog(blogId, _id)
  return res.json({
    success: data ? true : false,
    message: data ? 'Success' : 'Failed',
    data
  })
})

// Dislike blog
const dislikeBlog = asyncHandler(async(req, res) => {
  const { _id } = req.user
  const { blogId } = req.params
  if (!blogId) throw new Error('Missing inputs')
  const data = await blogService.dislikeBlog(blogId, _id)
  return res.json({
    success: data ? true : false,
    message: data ? 'Success' : 'Failed',
    data
  })
})

const uploadImage = asyncHandler(async(req, res) => {
  const { blogId } = req.params
  if (!req.file) throw new Error('Missing inputs')
  const data = await blogService.uploadImage(blogId, req.file)
  return res.status(200).json({
    success: data ? true : false,
    message: data ? 'Upload image is successfully' : 'Cannot upload image',
    data
  })
})

export {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  getBlogById,
  uploadImage
}