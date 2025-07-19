const express = require('express')
const router = express.Router()

const { getSalary, addSalary } = require('../controller/adminSalary')

router
    .route('/')
    .get(getSalary)

router
    .route('/addsalary')
    .post(addSalary)

module.exports = router