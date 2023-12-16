const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: ['true', 'Please add a title']
    },
    image: {
        type: String,
        default: 'https://thumbs.dreamstime.com/b/board-games-elements-round-concept-145839782.jpg'
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