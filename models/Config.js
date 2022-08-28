const mongoose = require('mongoose')


const configSchema = new mongoose.Schema({
    prefix: {
        type: String,
        default: '!'
    },
    guild:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Guild'
    },
    bankId:{
        type: String,
        default: ''
    },
    buyChannelId:{
        type: String,
        default: ''
    },
    lineCategories:{
        type: Array,
        default: []
    },
    lineImageLink :{
        type: String,
        default: 'https://cdn.discordapp.com/attachments/997904285209722930/997969744604971079/715982102935371926.gif'
    },
    taxRoom: {
        type: String,
    },
    feedbackRoom: {
        type: String,
    },
    ticketsCategory: {
        type: Array,
        default: []
    },
    sellerRole: {
        type: String,
        required: false
    },
    embedColor: {
        type: String,
        default: '#dc3545'
    },
    status: {
        type: String,
        default: 'on'
    },
    logsRoom: {
        type: String,
        default: ''
    },
    giveAwaysReaction :{
        type: String,
        default: '🎉'
    }
    
})


module.exports = mongoose.model('config', configSchema)