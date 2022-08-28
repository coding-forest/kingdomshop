const mongoose = require('mongoose')


const ticketSchema = new mongoose.Schema({
    guildId: {
        type: String,
        default: ''
    },
    channelId: {
        type: String,
        default: ''
    },
    originalName: {
        type: String,
    },
    responsibles: {
        type: Array
    }
})


module.exports = mongoose.model('ticket', ticketSchema)