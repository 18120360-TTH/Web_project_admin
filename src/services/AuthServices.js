const { models } = require('../models/index')
const sequelize = require('sequelize')

class AuthServices {
    findUser = (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await models.users.findOne({
                    raw: true,
                    where: {
                        username: username,
                        role: 'Admin'
                    }
                })

                resolve(result)
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = new AuthServices