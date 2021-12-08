const customerServices = require('./CustomerServices')

class CustomerController {

    //[GET] /customer-list
    async customerList(req, res) {
        const limit = 5
        let page
        if (req.query.page == undefined) { page = 1 }
        else { page = req.query.page }

        const { customers, count } = await customerServices.getAllCustomers(page, limit)

        // Calculate number of resulted pages
        const totalPage = Math.ceil(count / limit)

        // If user access an invalid page
        if (req.query.page < 1 || req.query.page > totalPage || (isNaN(req.query.page) && req.query.page != undefined)) {
            res.render('errors/404')
        }

        // On the first page, disable "Previous" and "First" button
        // On the last page, disable "Next" and "Last" button
        let isPreValid = true
        let isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == totalPage) { isNextValid = false }

        res.render('customers/customers-list', {
            customers,
            // Use for pagination
            path: "/customer/customers-list?page=",
            page,
            prePage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
            lastPage: totalPage,
            isPreValid,
            isNextValid,
        })
    }

    //[GET] /customer-detail
    async customerDetail(req, res) {
        const customer = await customerServices.findCustomer(req.query.username)
        res.render('customers/customers-detail', { customer })
    }
}

module.exports = new CustomerController