const Game = require('../models/gameModel')
const asyncHandler = require('express-async-handler')

// @desc Create game
// @route POST /api/game
// @access Private
const createGame = asyncHandler(async  (req, res) => {
    if(req.user.type !== "admin") {
        res.status(400)
        throw new Error('Unauthorized')
    }

    if (!req.body.title || !req.body.min_players || !req.body.max_players) {
        res.status(400)
        throw new Error('Missing fields')
    }

    const game = await Game.create({
        title: req.body.title,
        rules: req.body.rules,
        min_players: req.body.min_players,
        max_players: req.body.max_players
    })
    res.status(200).json(game)
})

// @desc Get games
// @route GET /api/games
// @access Private
const getGames = asyncHandler(async (req, res) => {
    const games = await Game.find().sort({createdAt: -1})
    res.status(200).send(games)
})

// @desc Get game
// @route GET /api/games/{id}
// @access Private
const getGame = asyncHandler(async (req, res) => {
    const game = await Game.findOne({_id:req.params.id})
    res.status(200).send(game)
})

// @desc Delete game
// @route DELETE /api/games/{id}
// @access Private
const deleteGame = asyncHandler(async (req, res) => {
    if (req.user.type !== "admin") {
        res.status(400)
        throw new Error('Unauthorized')
    }

    if (!req.params.id) {
        res.status(400)
        throw new Error('Missing fields')
    }

    await Game.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})


// @desc Update game
// @route PUT /api/games/:id
// @access Private
const updateGame = asyncHandler(async (req, res) => {
    if (req.user.type !== "admin") {
        res.status(400)
        throw new Error('Unauthorized')
    }

    const game = await Game.findById(req.params.id)

    if (!game) {
        res.status(400)
        throw new Error('Game not found')
    }

    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGame)
})


module.exports = {
    getGames,
    createGame,
    deleteGame,
    getGame,
    updateGame
}