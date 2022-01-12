const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/AuthController')
const initPassportLocal = require('../middleware/PassportHandler')

initPassportLocal()

router.get('/login', authController.loginView)
router.get('/logout', authController.logout)

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/auth/login?failed=true'
    }),
    authController.login
)

module.exports = router