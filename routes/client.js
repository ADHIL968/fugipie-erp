const express = require('express')
const router = express.Router()

const validateClient = require('../middleware/validateClient')

const { getHome, addWork, deleteWork, viewWork, getInvoice } = require('../controller/client')

router
    .route('/home')
    .get(validateClient, getHome)

router
    .route('/addwork')
    .post(validateClient, addWork)

router
    .route('/:workid/deletework')
    .get(validateClient, deleteWork)

router
    .route('/:workid/viewwork')
    .get(validateClient, viewWork)

router
    .route('/invoice')
    .get(validateClient, getInvoice)

module.exports = router