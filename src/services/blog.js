import asyncHandler from 'express-async-handler'
import Blog from '~/models/blog'

const createBlog = asyncHandler(async(data) => {
  const response = await Blog.create(data)
  return response
})

const getBlogs = asyncHandler(async() => {
  const response = await Blog
    .find()
    .populate('likes', 'firstName lastName')
    .populate('dislikes', 'firstName lastName')
  return response
})

const getBlogById = asyncHandler(async(blogId) => {
  const response = await Blog
    .findByIdAndUpdate(blogId, { $inc: { views: 1 } }, { new: true })
    .populate('likes', 'firstName lastName')
    .populate('dislikes', 'firstName lastName')
  return response
})

const updateBlogById = asyncHandler(async(blogId, updateData) => {
  const response = await Blog.findByIdAndUpdate(blogId, updateData, { new: true })
  return response
})

const deleteBlogById = asyncHandler(async(blogId) => {
  const response = await Blog.findByIdAndDelete(blogId)
  return response
})

const likeBlog = asyncHandler(async(blogId, userId) => {
  const blog = await Blog.findById(blogId)
  const alreadyDisliked = blog?.dislikes?.find(item => item.toString() === userId)

  if (alreadyDisliked) {
    return await Blog.findByIdAndUpdate(blogId, { $pull: { dislikes: userId } }, { new: true })
  }

  const isLiked = blog?.likes?.find(item => item.toString() === userId)
  if (isLiked) {
    return await Blog.findByIdAndUpdate(blogId, { $pull: { likes: userId } }, { new: true })
  } else {
    return await Blog.findByIdAndUpdate(blogId, { $push: { likes: userId } }, { new: true })
  }
})

const dislikeBlog = asyncHandler(async(blogId, userId) => {
  const blog = await Blog.findById(blogId)
  const alreadyLiked = blog?.likes?.find(item => item.toString() === userId)

  if (alreadyLiked) {
    return await Blog.findByIdAndUpdate(blogId, { $pull: { likes: userId } }, { new: true })
  }

  const isDisliked = blog?.dislikes?.find(item => item.toString() === userId)
  if (isDisliked) {
    return await Blog.findByIdAndUpdate(blogId, { $pull: { dislikes: userId } }, { new: true })
  } else {
    return await Blog.findByIdAndUpdate(blogId, { $push: { dislikes: userId } }, { new: true })
  }
})

const uploadImage = asyncHandler(async(blogId, file) => {
  const imagePath = file?.path
  const response = await Blog.findByIdAndUpdate(
    blogId,
    { image: imagePath },
    { new: true }
  )

  return response
})

const blogService = {
  createBlog,
  getBlogs,
  updateBlogById,
  deleteBlogById,
  likeBlog,
  dislikeBlog,
  getBlogById,
  uploadImage
}

export default blogService