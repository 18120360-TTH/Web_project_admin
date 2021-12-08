const { models } = require('../../config/db')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')

class SitesServices {
    addNewAdmin = (AccountInfo) => {
        return new Promise(async (resolve, reject) => {
            try {

                await models.users.create({
                    username: AccountInfo.username,
                    password_hashed: bcrypt.hashSync(AccountInfo.password, 10),
                    full_name: (AccountInfo.firstname + " " + AccountInfo.lastname),
                    email: AccountInfo.email,
                    avatar_url: '/images/avatars/person-0.png',
                    address: " ",
                    role: "Admin",
                    active: 1,
                    phone_number: AccountInfo.phone
                }, { raw: true })

                resolve("New admin added !!!")
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getAllAdmins = (page, limit) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * limit
                const result = await models.users.findAndCountAll({
                    raw: true,
                    offset: offset,
                    limit: limit,
                    where: {
                        role: "Admin"
                    }
                })
                const admins = result.rows
                const count = result.count

                resolve({ admins, count })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    findAdmin = (username) => {
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

module.exports = new SitesServices