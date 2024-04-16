// import 'dotenv/config'
import express from 'express'
import dbConnect from '~/config/dbConnect'
import initRoutes from '~/routes/v1'
import { env } from '~/config/environment'
import cookieParser from 'cookie-parser'

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Connect to database
dbConnect()

// Define routes
initRoutes(app)
app.use('/', (req, res) => res.send('SERVER ON'))

// Run server
app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://${env.APP_HOST}:${env.APP_PORT}`)
})
