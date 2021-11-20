class CustomerController {
    
    //[GET] /customer-list
    customerList(req,res){
        res.render('customers/customers-list')
    }
}

module.exports = new CustomerController