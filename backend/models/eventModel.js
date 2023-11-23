const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: ['true', 'Please add a title']
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    suggested_games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: {
        type: Date,
        required: ['true', 'Please add a date']
    },
    time: {
        type: String,
        required: ['true', 'Please add a time']
    },
    location: {
        type: String,
        required: ['true', 'Please add a location']
    },
    status: {
        type: String,
        default: 'created'
    },
    // messages : [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Message'
    // }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', eventSchema)