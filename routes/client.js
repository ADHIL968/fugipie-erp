const express = require('express')
const router = express.Router()

const { getHome, addWork, deleteWork, viewWork, getInvoice, viewInvoice } = require('../controller/client')

router
    .route('/')
    .get(getHome)

router
    .route('/addwork')
    .post(addWork)

router
    .route('/:workid/deletework')
    .get(deleteWork)

router
    .route('/:workid/viewwork')
    .get(viewWork)

router
    .route('/invoice')
    .get(getInvoice)

router
    .route('/:invoiceid/viewinvoice')
    .get(viewInvoice)

module.exports = router