const express = require('express')
const router = express.Router()

const { getAdminClients, addClients, getClientProfile, editClientProfile, addWork } = require('../controller/adminClients')

router
    .route('/')
    .get(getAdminClients)

router
    .route('/addclient')
    .post(addClients)

router
    .route('/:clientid/profile')
    .get(getClientProfile)

router
    .route('/:clientid/edit')
    .post(editClientProfile)

router
    .route('/:clientid/addwork')
    .post(addWork)

module.exports = router