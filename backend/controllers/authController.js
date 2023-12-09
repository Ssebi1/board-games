const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const {Types} = require("mongoose");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// @desc Login user
// @route POST /api/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400)
        throw new Error('Missing fields')
    }

    const user = await User.findOne({email}).populate('pref_games')

    if(!user || !(await bcrypt.compare(password, user.password))) {
        res.status(400)
        throw new Error('Cannot login user')
    }

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        location: user.location,
        pref_games: user.pref_games,
        pref_min_players: user.pref_min_players,
        pref_max_players: user.pref_max_players,
        token: generateToken(user._id)
    })
})

// @desc Register user
// @route POST /api/auth/register
// @access Public
const register = asyncHandler(async  (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Missing fields')
    }

    // Check if user already exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('This email is already used')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(!user) {
        res.status(400)
        throw new Error('Cannot register user')
    }

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        location: user.location,
        pref_games: user.pref_games,
        pref_min_players: user.pref_min_players,
        pref_max_players: user.pref_max_players,
        token: generateToken(user._id)
    })
})

// @desc Update account
// @route PUT /api/auth
// @access Private
const updateAccount = asyncHandler(async (req, res) => {
    const {name, location, pref_games, pref_min_players, pref_max_players} = req.body
    let pref_games_ids = []
    pref_games.forEach(game => {
        pref_games_ids.push(game.value)
    })
    console.log(pref_games)

    if (!req.user) {
        res.status(400)
        throw new Error('Unauthorized')
    }

    const user = await User.findByIdAndUpdate(req.user.id, {
        name,
        location,
        pref_games: pref_games_ids,
        pref_min_players,
        pref_max_players
    }, {new: true}).populate('pref_games')

    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        location: user.location,
        pref_games: user.pref_games,
        pref_min_players: user.pref_min_players,
        pref_max_players: user.pref_max_players,
        token: generateToken(user._id)
    })
})

// @desc Delete account
// @route DELETE /api/auth/
// @access Private
const deleteAccount = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400)
        throw new Error('Unauthorized')
    }
    const userEmail = req.user.email
    await User.findByIdAndDelete(req.user.id)
    res.status(200).json({userEmail})
})

module.exports = {
    login,
    register,
    updateAccount,
    deleteAccount
}