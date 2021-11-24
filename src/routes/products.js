const express = require('express')
const router = express.Router()

const ProductsController = require('../app/controllers/ProductsController')

router.use('/product-list', ProductsController.productList)
router.use('/product-detail', ProductsController.productDetail)
router.use('/product-edit', ProductsController.productEdit)
router.use('/add-product', ProductsController.addProduct)

router.post('/delete/:id', ProductsController.softdeleteProduct)
//router.put('/product-edit/:id', ProductsController.editProduct)
//router.post('/edit/:id', ProductsController.editProduct)

module.exports = router