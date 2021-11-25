const express = require('express')
const ProductsController = require('../app/controllers/ProductsController')
// const multer = require('multer')
// const path = require('path')

const router = express.Router()

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, path.join(__dirname, '../public/images/products_images'))
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage: storage })
//.array('image_1', 4)

router.use('/product-list', ProductsController.productList)
router.use('/products-searched', ProductsController.productSearch)
router.use('/product-edit', ProductsController.productEditView)
router.use('/add-product', ProductsController.addProduct)
router.post('/delete/:id', ProductsController.softDeleteProduct)
router.post('/products-edit/:id', ProductsController.productEdit)
// upload.array('book-img', 4), 
module.exports = router