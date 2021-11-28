const express = require('express')
const router = express.Router()

const OrdersController = require('../app/controllers/OrdersController')

router.use('/orders-detail', OrdersController.orderDetail)
router.use('/', OrdersController.orderList)

module.exports = router