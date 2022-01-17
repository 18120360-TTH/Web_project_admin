const { SequelizeScopeError } = require('sequelize/dist')
const productServices = require('../services/ProductServices')
const multer = require('multer')
const path = require('path')

class ProductsController {
    // [GET] /products-list
    async productList(req, res) {
        let page
        if (req.query.page == undefined) {
            page = 1
        }
        else {
            page = req.query.page
        }

        const { books, count } = await productServices.getAllBooks(page)

        // Calculate number of resulted pages
        const totalPage = Math.ceil(count / 6)

        // If user access an invalid page
        if (req.query.page < 1 || req.query.page > totalPage || (isNaN(req.query.page) && req.query.page != undefined)) {
            res.render('errors/404')
        }

        for (let i in books) {
            const bookImgs = await productServices.getImagesByBook(books[i].book_id)
            for (let j in bookImgs) {
                if (bookImgs[j].img_order == 1) {
                    books[i].img_url = bookImgs[j].img_url
                }
            }
        }

        // On the first page, disable "Previous" and "First" button
        // On the last page, disable "Next" and "Last" button
        let isPreValid = true
        let isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == totalPage) { isNextValid = false }

        // Use for filter
        const authorsList = await productServices.getAllAuthors()
        const publishersList = await productServices.getAllPublishers()

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
            count
        })
    }

    // [GET] /products-detail
    async productSearch(req, res) {
        let page
        if (req.query.page == undefined) {
            page = 1
        }
        else {
            page = req.query.page
        }

        const { searchedBooks, count } = await productServices.getSearchedBooks(req.query.search, page)

        // Calculate number of resulted pages
        const totalPage = Math.ceil(count / 6)

        // If user access an invalid page
        if (req.query.page < 1 || req.query.page > totalPage || (isNaN(req.query.page) && req.query.page != undefined)) {
            res.render('errors/404')
        }

        for (let i in searchedBooks) {
            const bookImgs = await productServices.getImagesByBook(searchedBooks[i].book_id)
            for (let j in bookImgs) {
                if (bookImgs[j].img_order == 1) {
                    searchedBooks[i].img_url = bookImgs[j].img_url
                }
            }
        }

        // On the first page, disable "Previous" and "First" button
        // On the last page, disable "Next" and "Last" button
        let isPreValid = true
        let isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == totalPage) { isNextValid = false }

        const authorsList = await productServices.getAllAuthors()
        const publishersList = await productServices.getAllPublishers()

        res.render('products/product-list', {
            books: searchedBooks,
            // Use for filter
            publishersList,
            authorsList,
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
            lastIndex: (page - 1) * 6 + searchedBooks.length,
            count
        })
    }

    async productCategory(req, res) {
        let page
        if (req.query.page == undefined) {
            page = 1
        }
        else {
            page = req.query.page
        }

        const result = await productServices.getBooksByCategory(req.query.category, page)
        const books = result.categorizedBooks
        const count = result.count

        // Calculate number of resulted pages
        const totalPage = Math.ceil(count / 6)

        // If user access an invalid page
        if (req.query.page < 1 || req.query.page > totalPage || (isNaN(req.query.page) && req.query.page != undefined)) {
            res.render('errors/404')
        }

        for (let i in books) {
            const bookImgs = await productServices.getImagesByBook(books[i].book_id)
            for (let j in bookImgs) {
                if (bookImgs[j].img_order == 1) {
                    books[i].img_url = bookImgs[j].img_url
                }
            }
        }

        // On the first page, disable "Previous" and "First" button
        // On the last page, disable "Next" and "Last" button
        let isPreValid = true
        let isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == totalPage) { isNextValid = false }

        const authorsList = await productServices.getAllAuthors()
        const publishersList = await productServices.getAllPublishers()

        let path = "/products/product-categorized?"
        for (let i in req.query) {
            if (i != 'page') {
                path += i + "=" + req.query[i] + "&"
            }
        }
        path += "page="

        res.render('products/product-list', {
            books,
            // Use for filter
            authorsList,
            publishersList,
            categoryStatus: req.query.category,
            // Use for pagination
            path,
            page,
            prePage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
            lastPage: totalPage,
            isPreValid,
            isNextValid,
            // Use to indicate result order
            firstIndex: (page - 1) * 6 + 1,
            lastIndex: (page - 1) * 6 + books.length,
            count
        })
    }

    async productFilter(req, res) {
        let page
        if (req.query.page == undefined) {
            page = 1
        }
        else {
            page = req.query.page
        }

        const result = await productServices.getFilteredBook(req.query, page)
        const filteredBooks = result.filteredBooks
        const count = result.count

        // Calculate number of resulted pages
        const totalPage = Math.ceil(count / 6)

        // If user access an invalid page
        if (req.query.page < 1 || req.query.page > totalPage || (isNaN(req.query.page) && req.query.page != undefined)) {
            res.render('errors/404')
        }

        for (let i in filteredBooks) {
            const bookImgs = await productServices.getImagesByBook(filteredBooks[i].book_id)
            for (let j in bookImgs) {
                if (bookImgs[j].img_order == 1) {
                    filteredBooks[i].img_url = bookImgs[j].img_url
                }
            }
        }

        // On the first page, disable "Previous" and "First" button
        // On the last page, disable "Next" and "Last" button
        let isPreValid = true
        let isNextValid = true
        if (page == 1) { isPreValid = false }
        if (page == totalPage) { isNextValid = false }

        const authorsList = await productServices.getAllAuthors()
        const publishersList = await productServices.getAllPublishers()

        let path = "/products/product-filtered?"
        for (let i in req.query) {
            if (i != 'page') {
                path += i + "=" + req.query[i] + "&"
            }
        }
        path += "page="

        res.render('products/product-list', {
            books: filteredBooks,
            // Use for filter
            authorsList,
            publishersList,
            filterStatus: req.query,
            // Use for pagination
            path,
            page,
            prePage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
            lastPage: totalPage,
            isPreValid,
            isNextValid,
            // Use to indicate result order
            firstIndex: (page - 1) * 6 + 1,
            lastIndex: (page - 1) * 6 + filteredBooks.length,
            count: count
        })
    }

    // [GET] /products-edit
    async productEditView(req, res) {
        const bookByID = await productServices.getBookByID(req.query.ID)
        const bookImgs = await productServices.getImagesByBook(req.query.ID)
        const bookAuthors = await productServices.getAuthorsByBook(req.query.ID)
        const bookCategories = await productServices.getCategoriesByBook(req.query.ID)

        let authors = bookAuthors[0].author_name
        for (let i in bookAuthors) {
            if (i != 0) {
                authors += ", " + bookAuthors[i].author_name
            }
        }
        bookByID.authors = authors

        bookByID.category_01 = bookCategories[0].category
        if (bookCategories.length > 1) {
            bookByID.category_02 = bookCategories[1].category
        }

        for (let i in bookImgs) {
            bookByID['img_' + bookImgs[i].img_order] = bookImgs[i].img_url
        }

        if (bookByID == null) {
            res.render('errors/404')
        } else {
            res.render('products/product-edit', { bookByID, bookCategories })
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
                callback(null, ID + '_' + Date.now() + path.extname(file.originalname))
            }
        })

        const upload = multer({ storage: storage }).fields([
            { name: 'img_1', maxCount: 1 },
            { name: 'img_2', maxCount: 1 },
            { name: 'img_3', maxCount: 1 },
            { name: 'img_4', maxCount: 1 }
        ])

        upload(req, res, async function (err) {
            await productServices.editBookByID(req.params.id, req.body, req.files)
        })

        res.redirect('/products/product-list')
    }

    // [GET] /add-product
    addProduct(req, res) {
        res.render('products/add-product')
    }

    //[POST] /products/products-list/delete
    async softDeleteProduct(req, res) {
        let isDeleted = await productServices.softDeleteBookByID(req.params.id)
        res.redirect('/products/product-list')
    }

    //[POST] /products/products-list/add-product
    async newProductAdd(req, res) {
        const ID = await productServices.findMaxBookID() + 1

        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, path.join(__dirname, '../public/images/products_images'))
            },
            filename: function (req, file, callback) {
                callback(null, ID + '_' + Date.now() + path.extname(file.originalname))
            }
        })

        const upload = multer({ storage: storage }).fields([
            { name: 'img_1', maxCount: 1 },
            { name: 'img_2', maxCount: 1 },
            { name: 'img_3', maxCount: 1 },
            { name: 'img_4', maxCount: 1 }
        ])

        upload(req, res, async function (err) {
            await productServices.addNewProduct(req.body, req.files)
        })
        res.redirect('/products/product-list')
    }
}

module.exports = new ProductsController