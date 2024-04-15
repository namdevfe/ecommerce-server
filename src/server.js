require('dotenv').config()
const express = require('express')
const dbConnect = require('./config/dbConnect')
const initRoutes = require('./routes')

const app = express()
const port = process.env.PORT || 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to database
dbConnect()

// Define routes
initRoutes(app)
app.use('/', (req, res) => res.send('SERVER ON'))

// Run server
app.listen(port, () => console.log(`Server listening on port ${port}`))