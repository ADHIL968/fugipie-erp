const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    client: {
        id: String,
        name: String
    },
    amount: Number,
    date: String,
    day: String,
    month: String,
    year: String,
    data: [],
    ispaid: {
        type: Boolean,
        default: false
    },
    paidon: {
        type: String,
        default: "nill"
    },
    iscanceled: {
        type: Boolean,
        default: false
    },
    cancelReason: {
        type: String,
        default: ""
    }
}, { timestamps: true })

module.exports = mongoose.model('Invoice', invoiceSchema)