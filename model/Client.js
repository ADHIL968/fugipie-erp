const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const clientSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    username: String,
    password: String,
    contactPerson: String,
    contactNumber: String,
    hourlyRate: {
        type: Number,
        default: 0
    },
    pendingMinutes: {
        type: Number,
        default: 0
    },
    credit: {
        type: Number,
        default: 0
    },
    pendingBalance: {
        type: Number,
        default: 0
    },
})


clientSchema.pre('save', async function (next) {
    if (!(this.isModified('password'))) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

clientSchema.methods.validateClientPassword = async function (clientSendPassword) {
    return await bcrypt.compare(clientSendPassword, this.password)
}

clientSchema.methods.createClientToken = function () {
    return jwt.sign(
        {
            id: this.id,
            name: this.name,
            username: this.username
        }, process.env.JWT_SECRET,
    )
}

module.exports = mongoose.model('Client', clientSchema)