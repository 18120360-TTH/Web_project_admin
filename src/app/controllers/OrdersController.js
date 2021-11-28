class OrdersController {

    // [GET] /order-list
    orderList(req, res) {
        res.render('orders/orders-list')
    }

    // [GET] /orders-detail
    orderDetail(req, res) {
        res.render('orders/orders-detail')
    }

}

module.exports = new OrdersController