const { models } = require('../../config/db')
const sequelize = require('sequelize')

// class SitesServices {
//     find = (username) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const result = await models.users.findByPk(, {
//                     raw: true,
//                     where: { is_deleted: false }
//                 })
//                 resolve(book)
//             }
//             catch (err) {
//                 reject(err)
//             }
//         })
//     }
// }

module.exports = new SitesServices