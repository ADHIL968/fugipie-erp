const express = require('express')
const router = express.Router()

const { getLogin, login, logout } = require('../controller/adminAuth')

router
    .route('/login')
    .get(getLogin)
    .post(login)

router
    .route('/logout')
    .get(logout)

module.exports = router