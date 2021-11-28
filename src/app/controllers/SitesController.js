
class SitesController {

    // [GET] /index
    home(req, res) {
        res.render('sites/index')
    }

    // [GET] /index
    admin(req, res) {
        res.render('sites/admin-profile')
    }
}

module.exports = new SitesController