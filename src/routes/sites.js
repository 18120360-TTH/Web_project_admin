const express = require('express')
const router = express.Router()

const sitesController = require('../controllers/SitesController')
//const authController = require('../controllers/AuthController')

// router.use('/admin-profile', sitesController.admin)
router.use('/', sitesController.home)

module.exports = router