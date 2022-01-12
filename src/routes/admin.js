const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController')

router.get('/admins-list', adminController.adminsList)
router.get('/add-account', adminController.addAdminPage)
router.get('/admin-profile', adminController.adminProfile)

router.post('/add-account', adminController.addNewAdmin)
router.post('/update-profile', adminController.updateProfile)

module.exports = router