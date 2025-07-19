const express = require('express')
const router = express.Router()

const { getAddInvoice, addInvoice, getInvoice, payment, viewInvoice } = require('../controller/adminInvoice')

router
    .route('/')
    .get(getInvoice)

router
    .route('/add')
    .get(getAddInvoice)
    .post(addInvoice)

router
    .route('/payment')
    .post(payment)

router
    .route('/:invoiceid/view')
    .get(viewInvoice)

module.exports = router