const express = require('express')
const router = express.Router()

const sitesController = require('../app/controllers/SitesController')

router.use('/admin-profile', sitesController.admin)
router.use('/', sitesController.home)

module.exports = router