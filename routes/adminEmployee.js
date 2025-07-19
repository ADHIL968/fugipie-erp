const express = require('express')
const router = express.Router()

const { getEmployee, addEmployee, viewEmployeeProfile, editEmployeeProfile } = require('../controller/adminEmployee')

router
    .route('/')
    .get(getEmployee)

router
    .route('/addemployee')
    .post(addEmployee)

router
    .route('/:employeeid/profile')
    .get(viewEmployeeProfile)

router
    .route('/:employeeid/edit')
    .post(editEmployeeProfile)

module.exports = router