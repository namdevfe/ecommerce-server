import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { env } from '~/config/environment'

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, env.JWT_SECRET_KEY, (error, decode) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: 'Invalid access token'
        })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Require authentication'
    })
  }
})

export { verifyAccessToken }
