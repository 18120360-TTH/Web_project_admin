const express = require('express')
const router = express.Router()
const CustomerController = require('../app/controllers/CustomerController')

router.use('/customers-list', CustomerController.customerList)
router.use('/customer-detail', CustomerController.customerDetail)
// router.use('/admin', CustomerController.adminProfile)
// router.use('/admin-edit', CustomerController.adminProfile)

module.exports = router