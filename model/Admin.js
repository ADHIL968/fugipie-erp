const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String
})

adminSchema.pre('save', async function (next) {
    if (!(this.isModified('password'))) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

adminSchema.methods.validateAdminPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

adminSchema.methods.createAdminToken = function () {
    return jwt.sign(
        {
            id: this.id,
        }, process.env.JWT_SECRET,
    )
}

module.exports = mongoose.model('Admin', adminSchema)