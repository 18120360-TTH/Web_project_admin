const express = require('express')
const router = express.Router()

const OrdersController = require('../controllers/OrdersController')

router.post('/update-status/:order_id',OrdersController.updateStatus)

router.use('/orders-detail', OrdersController.orderDetail)
router.use('/', OrdersController.orderList)

module.exports = router