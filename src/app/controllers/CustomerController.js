class CustomerController {

    //[GET] /customer-list
    customerList(req, res) {
        res.render('customers/customers-list')
    }

    customerDetail(req, res) {
        res.render('customers/customers-detail')
    }
}

module.exports = new CustomerController