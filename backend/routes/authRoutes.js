// express
const express = require('express')
const router = express.Router()
// controllers
const { login, register, updateAccount, deleteAccount} = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')
// export router
module.exports = router
var path = require('path')

// POST
router.post('/login', login)
router.post('/register', register)

// PUT
router.put('/', protect, updateAccount)

// DELETE
router.delete('/', protect, deleteAccount)