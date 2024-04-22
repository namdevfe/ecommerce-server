import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
  BASE_URL: process.env.BASE_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  EMAIL_NAME: process.env.EMAIL_NAME,
  EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET
}