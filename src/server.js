const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Define routes
app.use('/', (req, res) => res.send('SERVER ON'))

// Run server
app.listen(port, () => console.log(`Server listening on port ${port}`))