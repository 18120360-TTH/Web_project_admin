const { models } = require('../../config/db')
const sequelize = require('sequelize')

class SitesServices {
    getAllCustomers = (page) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * 10
                const result = await models.users.findAndCountAll({
                    raw: true,
                    offset: offset,
                    limit: 10,
                    where: { role: "Customer" }
                })

                resolve({ customers: result.rows, count: result.count })
            }
            catch (err) { reject(err) }
        })
    }
}

module.exports = new SitesServices