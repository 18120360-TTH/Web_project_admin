const express = require('express')
const router = express.Router()
const AdminController = require('../app/controllers/AdminController')

router.get('/admins-list', AdminController.adminsList)
router.get('/add-account', AdminController.addAdminPage)
router.use('/admin-profile', AdminController.adminProfile)

router.post('/add-account/new-admin', AdminController.addNewAdmin)

module.exports = router