const express = require('express')
const router = express.Router()

const ProductsController = require('../app/controllers/ProductsController')

router.use('/', ProductsController.productList)
router.use('/product-detail', ProductsController.productDetail)
router.use('/product-edit', ProductsController.productEdit)
router.use('/add-product', ProductsController.addProduct)

module.exports = router