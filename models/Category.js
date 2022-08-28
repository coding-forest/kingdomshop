const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    guildId: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
})


module.exports = mongoose.model('category', categorySchema)