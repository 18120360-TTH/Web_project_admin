const { models } = require('../models/index')
const sequelize = require('sequelize')

class ProductServices {
    getAllBooks = (page) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * 6
                const result = await models.books.findAndCountAll({
                    raw: true,
                    offset: offset,
                    limit: 6,
                    where: {
                        is_deleted: false
                    }
                })
                const books = result.rows
                const count = result.count

                resolve({ books, count })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getSearchedBooks(keyword, page) {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * 6
                const result = await models.books.findAndCountAll({
                    raw: true,
                    offset: offset,
                    limit: 6,
                    where: {
                        title: {
                            [sequelize.Op.substring]: keyword
                        }
                    }
                })

                const searchedBooks = result.rows
                const count = result.count

                resolve({ searchedBooks, count })
            }
            catch (err) { reject(err) }
        })
    }

    getImagesByBook = (ID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const imgs = models.images.findAll({
                    raw: true,
                    where: { book_id: ID }
                })
                resolve(imgs)
            }
            catch (err) { reject(err) }
        })
    }

    getAuthorsByBook = (ID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const authors = models.authors.findAll({
                    raw: true,
                    where: {
                        book_id: ID
                    }
                })
                resolve(authors)
            }
            catch (err) { reject(err) }
        })
    }

    getCategoriesByBook = (ID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const categories = models.categories_of_book.findAll({
                    raw: true,
                    where: { book_id: ID }
                })
                resolve(categories)
            }
            catch (err) { reject(err) }
        })
    }

    getAllAuthors = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const authorsList = models.authors.findAll({
                    raw: true,
                    attributes: [[sequelize.fn('DISTINCT', sequelize.col('author_name')), 'author']]
                })
                resolve(authorsList)
            }
            catch (err) { reject(err) }
        })
    }

    getAllPublishers = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const publishersList = models.books.findAll({
                    raw: true,
                    attributes: [[sequelize.fn('DISTINCT', sequelize.col('publisher')), 'publisher']],
                    where: {
                        is_deleted: false
                    }
                })
                resolve(publishersList)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getBookByID = (ID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const book = models.books.findByPk(ID, {
                    raw: true,
                    where: { is_deleted: false }
                })
                resolve(book)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getBooksByCategory = (category, page) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * 6
                const result = await models.books.findAndCountAll({
                    raw: true,
                    offset: offset,
                    limit: 6,
                    where: { is_deleted: false },
                    include: {
                        model: models.categories_of_book,
                        as: "categories_of_book",
                        where: {
                            category: category
                        }
                    }
                })

                const categorizedBooks = result.rows
                const count = result.count

                resolve({ categorizedBooks, count })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getFilteredBook = (query, page) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * 6

                // Without filter attributes, get all books in database
                let optionQuery = {
                    raw: true,
                    offset: offset,
                    limit: 6,
                    where: { is_deleted: false }
                }

                // If any attribute is not equal to default value, add it to where clause
                if (query.min_price != 0 || query.max_price != 1000) {
                    optionQuery.where.price = {
                        [sequelize.Op.between]: [query.min_price * 1000, query.max_price * 1000]
                    }
                }
                if (query.publisher != "all") { optionQuery.where.publisher = query.publisher }
                if (query.language != "all") { optionQuery.where.language = query.language }

                // If author attribute is dedicated, add it to include clause
                if (query.author != "all") {
                    optionQuery.include = [{
                        model: models.authors,
                        as: "authors",
                        where: { author_name: query.author }
                    }]
                }

                // Query to the database
                const result = await models.books.findAndCountAll(optionQuery)
                const filteredBooks = result.rows
                const count = result.count

                resolve({ filteredBooks, count })
            }
            catch (err) {
                reject(err)
            }
        })
    }

    softDeleteBookByID = (ID) => {
        //Main idea: update attribute 'is_deleted' = true in table "books"
        return new Promise(async (resolve, reject) => {
            try {
                // const book = 
                await models.books.update({ is_deleted: true }, {
                    raw: true,
                    where: { book_id: ID }
                })
                resolve("Book is deleted!")
            }
            catch (err) {
                reject(err)
            }
        })
    }

    editBookByID = (ID, basicInfo, images) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Update data in books table
                await models.books.update({
                    title: basicInfo.title,
                    ISBN: basicInfo.isbn,
                    release_year: basicInfo.release_year,
                    price: basicInfo.sale_price,
                    publisher: basicInfo.publisher,
                    number_of_pages: basicInfo.page_num,
                    language: basicInfo.language,
                    quantity_in_stock: basicInfo.quantity
                }, {
                    raw: true,
                    where: { book_id: ID }
                })

                // Update data in authors table
                const authorArr = basicInfo.author.split(', ');

                await models.authors.destroy({
                    where: { book_id: ID }
                })

                for (let i in authorArr) {
                    await models.authors.create({
                        author_name: authorArr[i],
                        book_id: ID
                    }, { raw: true })
                }

                // Update data in categories_of_books table
                await models.categories_of_book.destroy({
                    where: { book_id: ID }
                })

                await models.categories_of_book.create({
                    category: basicInfo.category_01,
                    book_id: ID
                }, { raw: true })

                console.log("------------------------")
                console.log(images)
                console.log("------------------------")

                if (basicInfo.category_02 != "None" && basicInfo.category_02 != basicInfo.category_01) {
                    await models.categories_of_book.create({
                        category: basicInfo.category_02,
                        book_id: ID
                    }, { raw: true })
                }

                if (images.img_1 != undefined) {
                    const img_url = '/images/products_images/' + images.img_1[0].filename

                    await models.images.update({ img_url: img_url }, {
                        raw: true,
                        where: { book_id: ID, img_order: 1 }
                    })
                }

                if (images.img_2 != undefined) {
                    const img_url = '/images/products_images/' + images.img_2[0].filename

                    await models.images.update({ img_url: img_url }, {
                        raw: true,
                        where: { book_id: ID, img_order: 2 }
                    })
                }

                if (images.img_3 != undefined) {
                    const img_url = '/images/products_images/' + images.img_3[0].filename

                    await models.images.update({ img_url: img_url }, {
                        raw: true,
                        where: { book_id: ID, img_order: 3 }
                    })
                }

                if (images.img_4 != undefined) {
                    const img_url = '/images/products_images/' + images.img_4[0].filename

                    const msg = await models.images.update({ img_url: img_url }, {
                        raw: true,
                        where: { book_id: ID, img_order: 4 }
                    })

                    console.log(msg)
                }

                resolve("Book is updated!")
            }
            catch (err) {
                reject(err)
            }
        })
    }

    findMaxBookID = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await models.books.findAll({
                    raw: true,
                    nest: true,
                    attributes: [[sequelize.fn('max', sequelize.col('book_id')), 'book_id']],
                })

                const max_book_id = Math.max(parseInt(result[0].book_id), 0)

                resolve(max_book_id)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    addNewProduct = (basicInfo, images) => {
        return new Promise(async (resolve, reject) => {
            try {
                const max_id = await this.findMaxBookID()

                console.log(images)
                // Create new book must be first because of Foreign-key
                await models.books.create({
                    book_id: max_id + 1,
                    title: (basicInfo.title),
                    ISBN: (basicInfo.isbn),
                    release_year: basicInfo.release_year,
                    price: (basicInfo.sale_price),
                    publisher: basicInfo.publisher,
                    number_of_pages: (basicInfo.page_num),
                    language: basicInfo.language,
                    description: basicInfo.productDesc,
                    quantity_in_stock: basicInfo.quantity
                }, { raw: true })

                // Create author rows in authors table
                const authorArr = basicInfo.author.split(', ');

                for (let i in authorArr) {
                    await models.authors.create({
                        author_name: authorArr[i],
                        book_id: max_id + 1
                    }, { raw: true })
                }

                // Create category rows in categories_of_books table (max 2 of each book)
                await models.categories_of_book.create({
                    category: basicInfo.category_01,
                    book_id: max_id + 1
                }, { raw: true })

                if (basicInfo.category_02 != "None" && basicInfo.category_02 != basicInfo.category_01) {
                    await models.categories_of_book.create({
                        category: basicInfo.category_02,
                        book_id: max_id + 1
                    }, { raw: true })
                }

                // Create image_url rows in images table (fixed 4 of each book)
                await models.images.create({
                    img_url: '/images/products_images/' + images.img_1[0].filename,
                    book_id: max_id + 1,
                    img_order: 1
                }, { raw: true })

                await models.images.create({
                    book_id: max_id + 1,
                    img_url: '/images/products_images/' + images.img_2[0].filename,
                    img_order: 2
                }, { raw: true })

                await models.images.create({
                    book_id: max_id + 1,
                    img_url: '/images/products_images/' + images.img_3[0].filename,
                    img_order: 3
                }, { raw: true })

                await models.images.create({
                    book_id: max_id + 1,
                    img_url: '/images/products_images/' + images.img_4[0].filename,
                    img_order: 4
                }, { raw: true })

                resolve("Book is create!")
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = new ProductServices
