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
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// auth routes
app.use('/api/auth', require('./routes/authRoutes'))

// games routes
app.use('/api/games', require('./routes/gameRoutes'))

// events routes
app.use('/api/events', require('./routes/eventRoutes'))

// badges routes
app.use('/api/badges', require('./routes/badgeRoutes'))

// error handler
app.use(errorHandler)

// start app
const server = app.listen(port, () => {
    console.log('Server started on port ' + port)
})

module.exports = server