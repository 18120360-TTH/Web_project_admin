const express = require('express')
const router = express.Router()

const CustomerController = require('../app/controllers/CustomerController')

router.use('/', CustomerController.customerList)

module.exports = router