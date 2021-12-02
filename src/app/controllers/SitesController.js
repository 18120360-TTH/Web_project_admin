
const authServices = require('./AuthServices')

class SitesController {

    // [GET] /index
    home(req, res) {
        res.render('sites/index')
    }

    // [GET] /admin-profile
    async admin(req, res) {
        const userInfo = await authServices.findUser(req.user.username)
        res.render('sites/admin-profile', { userInfo })
    }
}

module.exports = new SitesController