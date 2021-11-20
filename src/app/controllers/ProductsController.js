class ProductsController{
    
    // [GET] /products-list
    productList(req,res){
        res.render('products/product-list')
    }

    // [GET] /products-detail
    productDetail(req,res){
        res.render('products/product-detail')
    }

    // [GET] /products-edit
    productEdit(req,res){
        res.render('products/product-edit')
    }

    // [GET] /add-product
    addProduct(req,res){
        res.render('products/add-product')
    }
}

module.exports = new ProductsController