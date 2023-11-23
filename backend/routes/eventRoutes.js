// express
const express = require('express')
const router = express.Router()
// controllers
const { getEvents, getEvent, createEvent, updateEvent, deleteEvent} = require('../controllers/eventController')
const { protect } = require('../middleware/authMiddleware')
// export router
module.exports = router

// GET
router.get('/', protect, getEvents)
router.get('/:id', protect, getEvent)

// POST
router.post('/', protect, createEvent)

// PUT
router.put('/:id', protect, updateEvent)

// DELETE
router.delete('/:id', protect, deleteEvent)