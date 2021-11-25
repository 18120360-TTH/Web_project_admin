const { SequelizeScopeError } = require('sequelize/dist')
const productServices = require('./ProductServices')
const multer = require('multer')
const path = require('path')

class ProductsController {
    // [GET] /products-list
    async productList(req, res) {
        // Calculate number of resulted pages
        const numOfResults = await productServices.countAllBooks()
        const totalPage = Math.ceil(numOfResults / 6)

        let page
        // If user access products-list without page
        if (req.query.page == undefined) {
            page = 1
        }
        // If user access an invalid page
        else if (req.query.page < 1 || req.query.page > totalPage || isNaN(req.query.page)) {
            res.render('errors/404')
        }
        else {
            page = req.query.page
        }
        // Get books list from database
        const books = await productServices.getAllBooks(page)

        for (let i in books) {
            const bookImgs = await productServices.getBookImages(books[i].book_id)
            books[i].img_url = bookImgs[0].img_url

        }

        const authorsList = await productServices.getAllAuthors()
        const publishersList = await productServices.getAllPublishers()

        // On the first page, disable "Previous" and "First" button
        // On the last page, disable "Next" and "Last" button
        let isPreValid = true
        let isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == totalPage) { isNextValid = false }

        res.render('products/product-list', {
            books,
            // Use for filter
            authorsList,
            publishersList,
            // Use for pagination
            path: "/products/product-list?page=",
            page,
            prePage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
            lastPage: totalPage,
            isPreValid,
            isNextValid,
            // Use to indicate results order
            firstIndex: (page - 1) * 6 + 1,
            lastIndex: (page - 1) * 6 + books.length,
            numOfResults
        })
    }

    // [GET] /products-detail
    async productSearch(req, res) {
        // Calculate number of resulted pages
        const numOfResults = await productServices.countAllSearchBooks(req.query.search)
        const totalPage = Math.ceil(numOfResults / 6)

        let page
        // If user access products-list without page
        if (req.query.page == undefined) {
            page = 1
        }
        // If user access an invalid page
        else if (req.query.page < 1 || req.query.page > totalPage || isNaN(req.query.page)) {
            res.render('errors/404')
        }
        else {
            page = req.query.page
        }
        // Get books list from database
        const books = await productServices.getAllSearchBooks(req.query.search, page)

        for (let i in books) {
            const bookImgs = await productServices.getBookImages(books[i].book_id)
            books[i].img_url = bookImgs[0].img_url

        }

        // On the first page, disable "Previous" and "First" button
        // On the last page, disable "Next" and "Last" button
        let isPreValid = true
        let isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == totalPage) { isNextValid = false }

        res.render('products/product-list', {
            books,
            // Use for pagination
            path: "/products/products-searched?page=",
            page,
            prePage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
            lastPage: totalPage,
            isPreValid,
            isNextValid,
            // Use to indicate results order
            firstIndex: (page - 1) * 6 + 1,
            lastIndex: (page - 1) * 6 + books.length,
            numOfResults
        })
    }

    // [GET] /products-edit
    async productEditView(req, res) {
        const bookByID = await productServices.getBookByID(req.query.ID)
        const bookImgs = await productServices.getBookImages(req.query.ID)
        const bookAuthors = await productServices.getBookAuthors(req.query.ID)

        let authors = bookAuthors[0].author_name
        for (let i in bookAuthors) {
            if (i != 0) {
                authors += ", " + bookAuthors[i].author_name
            }
        }
        bookByID.authors = authors

        if (bookByID == null) {
            res.render('errors/404')
        }
        else {
            res.render('products/product-edit', { bookByID, bookImgs })
        }
    }

    // [POST] /product-edit
    async productEdit(req, res) {
        let ID = req.params.id
        if (parseInt(ID) < 10) { ID = '0' + ID }

        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, path.join(__dirname, '../../public/images/products_images'))
            },
            filename: function (req, file, callback) {
                callback(null, ID + '-' + Date.now() + path.extname(file.originalname))
            }
        })

        const upload = multer({ storage: storage }).array('book-img', 4)

        upload(req, res, function (err) {
            console.log("File uploaded");
        })
        // console.log("------------------------")
        // console.log(req)
        // console.log("------------------------")

        await productServices.editBookByID(req.params.id, null, req.files)

        res.redirect('/products/product-list')
    }


    // [GET] /add-product
    addProduct(req, res) {
        res.render('products/add-product')
    }

    //[POST] DELETE
    async softDeleteProduct(req, res) {
        let isDeleted = await productServices.softDeleteBookByID(req.params.id)
        res.redirect('/products/product-list')
    }
}

module.exports = new ProductsController