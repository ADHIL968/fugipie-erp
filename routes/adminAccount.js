const express = require('express')
const router = express.Router()

const { getAccount, addTransaction } = require('../controller/adminAccount')


router.route('/')
    .get(getAccount)

router.route('/addtransaction')
    .post(addTransaction)

module.exports = router