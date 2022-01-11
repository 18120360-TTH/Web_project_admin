const orders = require('../models/orders')
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
        const limit = 5
        let page
        if (req.query.page == undefined) { page = 1 }
        else { page = req.query.page }

        const customer = await customerServices.findCustomer(req.query.username)
        const result = await customerServices.getOrdersByCustomer(req.query.username, page, limit)

        // Calculate number of resulted pages
        let isPreValid = true
        let isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == Math.ceil(result.count / limit)) { isNextValid = false }

        let totalSpent = 0
        for (let i in result.rows) {
            totalSpent += result.rows[i].final_cost
        }

        customer.averageSpent = Math.round(totalSpent / result.count)

        customer.lastOrder = {
            ID: result.rows[result.rows.length - 1].order_id,
            time: (Date.now() - result.rows[result.rows.length - 1].order_date).toString()
        }

        customer.recentAddress = {
            name: customer.username,
            address: result.rows[result.rows.length - 1].customer_address
        }

        // if (result.rows.length > 1) {
        //     customer.recentAddress[1] = {
        //         name: customer.username,
        //         address: result.rows[result.rows.length - 2].customer_address
        //     }
        // }

        res.render('customers/customers-detail', {
            customer,
            orders: result.rows,
            totalSpent,
            totalOder: result.count,
            // Use for pagination
            path: "/customer/customers-detail?username=" + req.query.username + "page=",
            page,
            prePage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
            lastPage: Math.ceil(result.count / limit),
            isPreValid,
            isNextValid
        })
    }
}

module.exports = new CustomerController