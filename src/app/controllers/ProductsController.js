class ProductsController{
    
    // [GET] /products-list
    productList(req,res){
        res.render('products/products-list')
    }

    // [GET] /products-detail
    productDetail(req,res){
        res.render('products/products-detail')
    }

    // [GET] /products-edit
    productEdit(req,res){
        res.render('products/products-edit')
    }

    // [GET] /add-product
    addProduct(req,res){
        res.render('products/add-product')
    }
}

module.exports = new ProductsController