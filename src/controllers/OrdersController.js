const ordersServices = require('../services/OrdersServices')

class OrdersController {

    // [GET] /order-list
    async orderList(req, res) {
        const limit = 5
        let page
        if (req.query.page == undefined) { page = 1 }
        else { page = req.query.page }

        const { orders, count } = await ordersServices.getAllOrders(page, limit)

        let isPreValid = true, isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == Math.ceil(count / limit)) { isNextValid = false }

        res.render('orders/orders-list', {
            orders,
            path: "/orders/orders-list?page=",
            page,
            prePage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
            lastPage: Math.ceil(count / limit),
            isPreValid,
            isNextValid
        })
    }

    // [GET] /orders-detail
    async orderDetail(req, res) {
        const { orderInfo, orderItems } = await ordersServices.getOrderByID(req.query.order_id)
        res.render('orders/orders-detail', { orderInfo, orderItems })
    }

    //[POST] /update-status/:order_id
    async updateStatus(req, res) {
        res.json(req.body)
       /*  const delivery_status = req.body.updateDeliveryStatus
        const order_id = req.params.order_id
        
        const isUpdate = await ordersServices.updateStatus(order_id,delivery_status)
 */
        res.redirect("/orders/order-list")
    }

}

module.exports = new OrdersController