const customerServices = require('./CustomerServices')

class CustomerController {

    //[GET] /customer-list
    async customerList(req, res) {
        const { customers, count } = await customerServices.getAllCustomers(1)
        //console.log(customers)
        res.render('customers/customers-list', { customers })
    }

    //[GET] /customer-detail
    customerDetail(req, res) {
        res.render('customers/customers-detail')
    }
}

module.exports = new CustomerController