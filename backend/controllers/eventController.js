const Event = require('../models/eventModel')
const asyncHandler = require('express-async-handler')

// @desc Create event
// @route POST /api/events
// @access Private
const createEvent = asyncHandler(async  (req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error('Unauthorized')
    }

    if (!req.body.title || !req.body.date || !req.body.location || !req.body.time) {
        res.status(400)
        throw new Error('Missing fields')
    }

    const event = await Event.create({
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        time: req.body.time,
        host: req.user
    })
    res.status(200).json(event)
})

// @desc Get events
// @route GET /api/events
// @access Private
const getEvents = asyncHandler(async (req, res) => {
    if(!req.user) {
        res.status(400)
        throw new Error('Unauthorized')
    }
    let events = await Event.find().sort({date: 1}).populate('host').populate('suggested_games').populate('game')
    // TODO: filter events by user
    res.status(200).send(events)
})

// @desc Get event
// @route GET /api/event/{id}
// @access Private
const getEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id).populate('host').populate('suggested_games').populate('game')
    res.status(200).send(event)
})

// @desc Delete event
// @route DELETE /api/event/{id}
// @access Private
const deleteEvent = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400)
        throw new Error('Unauthorized')
    }

    if (!req.params.id) {
        res.status(400)
        throw new Error('Missing fields')
    }

    await Event.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})

// @desc Update event
// @route PUT /api/event/:id
// @access Private
const updateEvent = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(400)
        throw new Error('Unauthorized')
    }

    const event = await Event.findById(req.params.id)

    if (!event) {
        res.status(400)
        throw new Error('Event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).populate('host').populate('suggested_games').populate('game')

    res.status(200).json(updatedEvent)
})


module.exports = {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent
}