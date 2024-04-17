import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'

const generateAccessToken = (userId, role) => jwt.sign({ _id: userId, role }, env.JWT_SECRET_KEY, { expiresIn: `${5 * 60}s` })
const generateRefreshToken = (userId) => jwt.sign({ _id: userId }, env.JWT_SECRET_KEY, { expiresIn: '7d' })

export { generateAccessToken, generateRefreshToken }