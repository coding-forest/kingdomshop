const mongoose = require('mongoose')


const lisenceKeySchema = new mongoose.Schema({
    guildId: {
        type: String,
        default: ''
    },
    key: {
        type: String,
        default: ''
    }
})


module.exports = mongoose.model('lisence_key', lisenceKeySchema)