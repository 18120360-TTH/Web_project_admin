const express = require('express')
const router = express.Router()

const ProductsController = require('../app/controllers/ProductsController')

router.use('/product-list', ProductsController.productList)
router.use('/products-searched', ProductsController.productSearch)
router.use('/product-edit', ProductsController.productEdit)
router.use('/add-product', ProductsController.addProduct)

module.exports = router