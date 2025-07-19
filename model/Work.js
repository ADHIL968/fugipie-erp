const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    client: {
        id: String,
        name: String
    },
    subject: String,
    description: String,
    urgency: String,
    attachment: String,
    status: {
        type: String,
        default: "requested"
    },
    assignedEmployee: {
        id: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        }
    },
    date: String,
    day: String,
    month: String,
    year: String,
    completion: {
        date: {
            type: String,
            default: ""
        },
        day: {
            type: String,
            default: ""
        },
        month: {
            type: String,
            default: ""
        },
        year: {
            type: String,
            default: ""
        },
    },
    time: {
        type: String,
        default: ""
    },
    amount: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Work', workSchema)