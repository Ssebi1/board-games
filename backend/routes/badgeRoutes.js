// express
const express = require('express')
const router = express.Router()
// controllers
const { createBadge, getBadges } = require('../controllers/badgeController')
const { protect } = require('../middleware/authMiddleware')
// export router
module.exports = router

// GET
router.get('/', protect, getBadges)

// POST
router.post('/', protect, createBadge)

