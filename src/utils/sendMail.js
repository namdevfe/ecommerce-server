import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler'
import { env } from '~/config/environment'

const sendMail = asyncHandler(async ({ email, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: env.EMAIL_NAME,
      pass: env.EMAIL_APP_PASSWORD
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"exclusive-shop" <no-reply@exclusive.com>', // sender address
    to: email, // list of receivers
    subject: 'Forgot password', // Subject line
    html: html // html body
  })

  return info
})

export default sendMail