const productsRouter = require('./products')
const authRouter = require('./auth')
const customerRouter = require('./customer')
const errorsRouter = require('./errors')
const sitesRouter = require('./sites')
const ordersRouter = require('./orders')
const authController = require('../controllers/AuthController')
const adminController = require('./admin')

function route(app) {
    // Just allow user get authentication view if not login yet
    app.use('/auth', authRouter)

    // Check if user is authenticated or not
    app.use(authController.authenCheck)

    // Allow user access all pages
    app.use('/products', productsRouter)
    app.use('/customer', customerRouter)
    app.use('/admin', adminController)
    app.use('/orders', ordersRouter)
    app.use('/', sitesRouter)
    app.use('*', errorsRouter)
}

module.exports = route
