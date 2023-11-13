const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: ['true', 'Please add a title']
    },
    rules: {
        type: String
    },
    min_players: {
        type: Number,
        required: ['true', 'Please add min players'],
        default: 2
    },
    max_players: {
        type: Number,
        required: ['true', 'Please add min players'],
        default: 2
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Game', gameSchema)