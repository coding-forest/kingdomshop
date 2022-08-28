const mongoose = require('mongoose')


const guildSchema = new mongoose.Schema({
    guildId: {
        type: String,
        unique: true,
    },
    guildOwnerId: {
        type: String
    },
    guildName:{
    	type: String,
        default: ''
    },
    lisenced: {
        type: Boolean,
        default: true
    }    
})


module.exports = mongoose.model('guild', guildSchema)