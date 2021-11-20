const express = require('express')
const router = express.Router()

const OrdersController = require('../app/controllers/OrdersController')

router.use('/orders-list', OrdersController.orderList)

module.exports = router