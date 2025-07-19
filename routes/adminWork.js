const express = require('express')
const router = express.Router()

const { getWorks, viewWork, editWork, assignEmployee } = require('../controller/adminWorks')

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

module.exports = router