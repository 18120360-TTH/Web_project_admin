const express = require('express')
const router = express.Router()

const sitesController = require('../app/controllers/SitesController')
const authController = require('../app/controllers/AuthController')

router.use('/admin-profile', sitesController.admin)
router.use('/', sitesController.home)

module.exports = router