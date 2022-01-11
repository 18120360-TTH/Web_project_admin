const express = require('express')
const router = express.Router()
const CustomerController = require('../app/controllers/CustomerController')

router.get('/customers-list', CustomerController.customerList)
router.get('/customer-detail', CustomerController.customerDetail)

module.exports = router