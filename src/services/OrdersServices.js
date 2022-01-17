const { models } = require('../models/index')
// const sequelize = require('sequelize')

class SitesServices {
    getAllOrders = (page, limit) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * limit
                const result = await models.orders.findAndCountAll({
                    raw: true,
                    offset: offset,
                    limit: limit,
                })

                for (let i in result.rows) {
                    result.rows[i].order_date = result.rows[i].order_date.toDateString()
                }

                resolve({ orders: result.rows, count: result.count })
            }
            catch (err) { reject(err) }
        })
    }

    getOrderByID = (order_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const orderInfo = await models.orders.findByPk(parseInt(order_id), {
                    raw: true,
                    include: { model: models.users, as: 'customer_username_user' }
                })
                orderInfo.order_date = orderInfo.order_date.toDateString()
                orderInfo.expected_arriving_time = orderInfo.expected_arriving_time.toDateString()

                const orderItems = await models.order_items.findAll({
                    raw: true,
                    where: { order_id: order_id },
                    include: {
                        model: models.books,
                        as: "book",
                        include: {
                            model: models.images,
                            as: 'images',
                            where: { img_order: 1 }
                        }
                    }
                })

                orderInfo.items_number = 0
                for (let i in orderItems) {
                    orderItems[i].total_price = orderItems[i].items_quantity * orderItems[i]['book.price']
                    orderInfo.items_number += orderItems[i].items_quantity
                }

                resolve({ orderInfo, orderItems })
            }
            catch (err) { reject(err) }
        })
    }

    updateStatus = (order_id,delivery_status) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await models.orders.update(
                    {delivery_status: delivery_status},
                    {where: { order_id: order_id }
                });
                resolve(result)
            }
            catch (err) { reject(err) }
        })
    }

    // getOrdersByCustomer = (username, page, limit) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             console.log("--------------------------------------")
    //             console.log(username, page, limit)
    //             console.log("--------------------------------------")

    //             const result = await models.orders.findAndCountAll({
    //                 raw: true,
    //                 offset: (page - 1) * limit,
    //                 limit: limit,
    //                 where: { customer_username: username }
    //             })

    //             resolve(result)
    //         }
    //         catch (err) { reject(err) }
    //     })
    // }
}

module.exports = new SitesServices