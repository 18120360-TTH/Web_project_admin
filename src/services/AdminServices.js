const { models } = require('../models/index')
const sequelize = require('sequelize')
const bcrypt = require('bcrypt')

class SitesServices {
    addNewAdmin = (AccountInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(AccountInfo)
                await models.users.create({
                    username: AccountInfo.username,
                    password_hashed: bcrypt.hashSync(AccountInfo.password, 10),
                    full_name: (AccountInfo.firstname + " " + AccountInfo.lastname),
                    email: AccountInfo.email,
                    verify_email: 1,
                    avatar_url: '/images/users/avatar-0.jpg',
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

    updateProfile = (username, profile, avatar) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!profile.full_name || !profile.email || !profile.phone_number || !profile.address) {
                    resolve("Service error: Some fields is blank!")
                }

                let updateClause = {
                    full_name: profile.full_name,
                    email: profile.email,
                    phone_number: profile.phone_number,
                    address: profile.address
                }
                if (avatar) { updateClause.avatar_url = '/images/users/' + avatar.filename }

                const result = await models.users.update(
                    updateClause,
                    { raw: true, where: { username: username, role: 'Admin' } }
                )

                resolve(result)
            }
            catch (err) { reject(err) }
        })
    }

}

module.exports = new SitesServices