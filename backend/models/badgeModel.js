const mongoose = require('mongoose')

const badgeSchema = mongoose.Schema({
    name: {
        type: String,
        required: ['true', 'Please add a title']
    },
    description: {
        type: String,
        required: ['true', 'Please add a short description']
    },
    photo: {
        type: String,
        required: ['true', 'Please add a photo']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Badge', badgeSchema)