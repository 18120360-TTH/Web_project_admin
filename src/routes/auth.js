const express = require('express')
const router = express.Router()

const authController = require('../app/controllers/AuthController')

router.use('/login', authController.login)
//router.use('register', authController.signup)
//router.use('/password-recovery', authController.pass_recover)

module.exports = router