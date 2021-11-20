class OrdersController{

    // [GET] /order-list
    orderList(req,res){
        res.render('orders/orders-list')
    }
    
}

module.exports = new OrdersController