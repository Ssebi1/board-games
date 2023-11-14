// express
const express = require('express')
const router = express.Router()
// controllers
const { getGames, createGame, deleteGame, getGame, updateGame} = require('../controllers/gamesController')
const { protect } = require('../middleware/authMiddleware')
// export router
module.exports = router

// GET
router.get('/', protect, getGames)
router.get('/:id', protect, getGame)

// POST
router.post('/', protect, createGame)

// PUT
router.put('/:id', protect, updateGame)

// DELETE
router.delete('/:id', protect, deleteGame)