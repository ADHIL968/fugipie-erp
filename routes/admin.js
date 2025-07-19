const express = require('express')
const router = express.Router()

const { getDashboard } = require('../controller/admin')

router
    .route('/')
    .get(getDashboard)

module.exports = router