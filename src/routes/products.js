const express = require('express')
const productsController = require('../controllers/ProductsController')
//const authController = require('../controllers/AuthController')

const router = express.Router()

router.use('/product-list', productsController.productList)
router.use('/products-searched', productsController.productSearch)
router.use('/product-categorized', productsController.productCategory)
router.use('/product-filtered', productsController.productFilter)

router.use('/product-edit', productsController.productEditView)
router.use('/add-product', productsController.addProduct)
router.post('/delete/:id', productsController.softDeleteProduct)

router.post('/products-edit/:id', productsController.productEdit)
router.post('/products-add/new-product', productsController.newProductAdd)

module.exports = router