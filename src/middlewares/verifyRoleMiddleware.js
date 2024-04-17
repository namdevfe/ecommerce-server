import asyncHandler from 'express-async-handler'

const ROLES = {
  ADMIN: 'admin'
}

const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user
  if (role !== ROLES.ADMIN) {
    return res.status(401).json({
      success: false,
      message: 'Require admin role'
    })
  }
  next()
})

export {
  isAdmin
}