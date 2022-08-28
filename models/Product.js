const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    status: {
        type: String,
        default: 'notSelled',
        required: false
    },
    value: {
        type: String,
        default: 'null'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    buyed_by:{
        type: Object,
        required: false
    },
    buyChannel: {
        type: String,
    },
    addedAt: {
        type: String,
        default: ''
    },
    buyedAt: {
        type: String,
        default:''
    }
})


module.exports = mongoose.model('product', productSchema)