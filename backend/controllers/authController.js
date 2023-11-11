const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

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

    const user = await User.findOne({email})

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
        token: generateToken(user._id)
    })
})

module.exports = {
    login,
    register
}