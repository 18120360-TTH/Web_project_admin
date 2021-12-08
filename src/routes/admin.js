const express = require('express')
const router = express.Router()
const AdminController = require('../app/controllers/AdminController')

router.get('/admins-list', AdminController.adminsList)
router.get('/add-account', AdminController.addAdminPage)
router.get('/admin-profile', AdminController.adminProfile)

router.post('/add-account', AdminController.addNewAdmin)

module.exports = router