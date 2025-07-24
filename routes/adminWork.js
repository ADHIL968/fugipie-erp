const express = require('express')
const router = express.Router()

const { getWorks, viewWork, editWork, assignEmployee, test } = require('../controller/adminWorks')

router
    .route('/')
    .get(getWorks)

router
    .route('/:workid/view')
    .get(viewWork)

router
    .route('/:workid/edit')
    .post(editWork)

router
    .route('/:workid/assign')
    .post(assignEmployee)

router
    .route('/test')
    .get(test)
module.exports = router