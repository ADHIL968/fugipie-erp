const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    type: String,
    amount: Number,
    description: String,
    date: String,
    day: String,
    month: String,
    year: String,
    iscredit: {
        type: Boolean,
        default: false
    },
    isdebit: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)