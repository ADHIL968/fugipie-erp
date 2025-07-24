const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const employeeSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    username: String,
    password: String,
    name: String,
    contactNumber: String,
    designation: String,
    dateOfJoining: String,
    workingHour: {
        type: Number,
        default: 0
    },
    payPerHour: {
        type: Number,
        default: 0
    },
    remarks: [],
    salary: [
        {
            id: String,
            salary: String,
            amount: Number,
            paymentDate: String,
            paid: {
                type: Boolean,
                default: false
            }
        }
    ]
})

employeeSchema.pre('save', async function (next) {
    if (!(this.isModified('password'))) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

employeeSchema.methods.validateEmployeePassword = async function (employeePassword) {
    return await bcrypt.compare(employeePassword, this.password)
}

employeeSchema.methods.createEmployeeToken = function () {
    return jwt.sign(
        {
            id: this.id,
            name: this.name,
            username: this.username
        }, process.env.JWT_SECRET,
    )
}

module.exports = mongoose.model('Employee', employeeSchema)