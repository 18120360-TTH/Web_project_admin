const express = require('express')
const router = express.Router()

const OrdersController = require('../app/controllers/OrdersController')

router.use('/', OrdersController.orderList)

module.exports = router