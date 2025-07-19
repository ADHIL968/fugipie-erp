const express = require('express')
const router = express.Router()

const { getHome, viewWork } = require('../controller/employee')

router
    .route('/')
    .get(getHome)

router
    .route('/:workid/view')
    .get(viewWork)

module.exports = router