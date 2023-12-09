const Badge = require('../models/badgeModel')
const asyncHandler = require('express-async-handler')

// @desc Create badge
// @route POST /api/badges
// @access Private
const createBadge = asyncHandler(async  (req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error('Unauthorized')
    }

    if (!req.body.description || !req.body.name || !req.body.photo) {
        res.status(400)
        throw new Error('Missing fields')
    }

    const event = await Badge.create({
        name: req.body.name,
        description: req.body.description,
        photo: req.body.photo
    })
    res.status(200).json(event)
})

// @desc Get badges
// @route GET /api/badges
// @access Private
const getBadges = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error('Unauthorized')
    }
    let badges = await Badge.find()
    res.status(200).send(badges)
})


module.exports = {
    createBadge,
    getBadges
}