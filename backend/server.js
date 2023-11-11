// express
const express = require('express')
// dotenv
const dotenv = require('dotenv').config()
// port
const port = process.env.PORT || 4040
// error handler
const { errorHandler } = require('./middleware/errorMiddleware')
// db connection function
const connectDB = require('./config/db')

// connect to db
connectDB()

// express app
const app = express()

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// auth routes
app.use('/api/auth', require('./routes/authRoutes'))

// error handler
app.use(errorHandler)

// start app
app.listen(port, () => {
    console.log('Server started on port ' + port)
})