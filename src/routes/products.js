const express = require('express')
const router = express.Router()

const ProductsController = require('../app/controllers/ProductsController')

router.use('/product-list', ProductsController.productList)
router.use('/products-searched', ProductsController.productSearch)
router.use('/product-edit', ProductsController.productEdit)
router.use('/add-product', ProductsController.addProduct)

router.post('/delete/:id', ProductsController.softDeleteProduct)
//router.put('/product-edit/:id', ProductsController.editProduct)
//router.post('/edit/:id', ProductsController.editProduct)

module.exports = router