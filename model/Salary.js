const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    employeeId: String,
    employeeName: String,
    designation: String,
    amount: Number,
    note: String,
    date: String,
    day: String,
    month: String,
    year: String,
}, { timestamps: true })

module.exports = mongoose.model('Salary', salarySchema)