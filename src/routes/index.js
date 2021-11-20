const productsRouter = require('./products')
const authRouter = require('./auth')
const customerRouter = require('./customer')
const errorsRouter = require('./errors')
const sitesRouter = require('./sites')
const ordersRouter = require('./orders')

function route(app) { 
    app.use('/products-list', productsRouter)
    app.use('/auth', authRouter)
    app.use('/customer', customerRouter)
    app.use('/orders', ordersRouter)
    app.use('/', sitesRouter)
    app.use('*', errorsRouter)
}

module.exports = route