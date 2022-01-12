const express = require('express')
const router = express.Router()

const ErrorsController = require('../controllers/ErrorsController')

router.use('/', ErrorsController.notFound)

module.exports = router