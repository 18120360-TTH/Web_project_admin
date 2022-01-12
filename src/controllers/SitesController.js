
//const authServices = require('../services/AuthServices')

class SitesController {

    // [GET] /index
    home(req, res) {
        res.render('sites/index')
    }

}

module.exports = new SitesController