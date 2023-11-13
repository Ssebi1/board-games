// express
const express = require('express')
const router = express.Router()
// controllers
const { getGames, createGame, deleteGame} = require('../controllers/gamesController')
const { protect } = require('../middleware/authMiddleware')
// export router
module.exports = router

// GET
router.get('/', protect, getGames)

// POST
router.post('/', protect, createGame)

// DELETE
router.delete('/', protect, deleteGame)