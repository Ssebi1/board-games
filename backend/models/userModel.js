const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: ['true', 'Please add a name']
    },
    email: {
        type: String,
        required: ['true', 'Please add an email'],
        unique: true
    },
    password: {
      type: String,
      required: ['true', 'Please add a password']
    },
    type: {
      type: String,
      default: 'client'
    },
    location: {
        type: String
    },
    pref_games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    pref_min_players: {
        type: Number,
        default: 2
    },
    pref_max_players: {
        type: Number,
        default: 2
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)