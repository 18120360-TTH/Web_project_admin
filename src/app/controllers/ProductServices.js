const { models } = require('../../config/db')
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
            catch (err) {
                reject(err)
            }
        })
    }

    getImagesByBook = (ID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const imgs = models.images.findAll({
                    raw: true,
                    where: {
                        book_id: ID
                    }
                })
                resolve(imgs)
            }
            catch (err) {
                reject(err)
            }
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
            catch (err) {
                reject(err)
            }
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
            catch (err) {
                reject(err)
            }
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

                console.log(optionQuery)

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
                if (images.img_1 != undefined) {
                    const img_url = '/images/products_images/' + images.img_1[0].filename

                    await models.images.update({ img_url: img_url }, {
                        raw: true,
                        where: { book_id: ID, img_order: 1 }
                    })
                }

                if (images.img_2 != undefined) {
                    const img_url = '/images/products-images/' + images.img_2[0].filename

                    await models.images.update({ img_url: img_url }, {
                        raw: true,
                        where: { book_id: ID, img_order: 2 }
                    })
                }

                if (images.img_3 != undefined) {
                    const img_url = '/images/products-images/' + images.img_3[0].filename

                    await models.images.update({ img_url: img_url }, {
                        raw: true,
                        where: { book_id: ID, img_order: 3 }
                    })
                }

                if (images.img_4 != undefined) {
                    const img_url = '/images/products-images/' + images.img_4[0].filename

                    await models.images.update({ img_url: img_url }, {
                        raw: true,
                        where: { book_id: ID, img_order: 4 }
                    })
                }

                //code your update basic info

                resolve("Book is updated!")
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = new ProductServices
