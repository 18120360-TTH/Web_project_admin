const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/CustomerController')

router.post('/block/:username',CustomerController.blockUser)
router.post('/unblock/:username',CustomerController.unblockUser)

router.get('/customers-list', CustomerController.customerList)
router.get('/customer-detail', CustomerController.customerDetail)

module.exports = router