const { models } = require('../models/index')
const sequelize = require('sequelize')

class SitesServices {
    getAllCustomers = (page, limit) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * limit
                const result = await models.users.findAndCountAll({
                    raw: true,
                    offset: offset,
                    limit: limit,
                    where: { role: "Customer" }
                })

                resolve({ customers: result.rows, count: result.count })
            }
            catch (err) { reject(err) }
        })
    }

    findCustomer = (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await models.users.findOne({
                    raw: true,
                    where: { username: username, role: 'Customer' }
                })

                resolve(result)
            }
            catch (err) { reject(err) }
        })
    }

    getOrdersByCustomer = (username, page, limit) => {
        return new Promise(async (resolve, reject) => {
            try {
                /* console.log("--------------------------------------")
                console.log(username, page, limit)
                console.log("--------------------------------------")*/
                const result = await models.orders.findAndCountAll({
                    raw: true,
                    offset: (page - 1) * limit,
                    limit: limit,
                    where: { customer_username: username }
                })

                for (let i in result.rows) {
                    result.rows[i].order_date = result.rows[i].order_date.toDateString()
                }

                resolve(result)
            }
            catch (err) { reject(err) }
        })
    }

    blockUser = (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await models.users.update(
                    {active: false},
                    {where: { username: username, role: 'Customer' }
                });

                resolve(result)
            }
            catch (err) { reject(err) }
        })
    }

    unblockUser = (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await models.users.update(
                    {active: true},
                    {where: { username: username, role: 'Customer' }
                });

                resolve(result)
            }
            catch (err) { reject(err) }
        })
    }
}

module.exports = new SitesServices