const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} is not found`)
  res.status(404)
  next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  return res.status(statusCode).json({
    success: false,
    message: error?.message || 'Interal Server Error'
  })
}

export { notFound, errorHandler }