import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

const generateAccessToken = (userId, role) => jwt.sign({ _id: userId, role }, env.JWT_SECRET_KEY, { expiresIn: '15s' })
const generateRefreshToken = (userId) => jwt.sign({ _id: userId }, env.JWT_SECRET_KEY, { expiresIn: '60s' })

export { generateAccessToken, generateRefreshToken }