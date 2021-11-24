const { models } = require('../../config/db')
const sequelize = require('sequelize')
class ProductServices {

    countAllBooks = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const amount = models.books.count({
                    where: { 
                        is_deleted: false 
                    }
                })
                resolve(amount)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getAllBooks = (page) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * 6
                const books = models.books.findAll({
                    raw: true,
                    offset: offset,
                    limit: 6,
                    where: {
                        is_deleted: false
                    }
                })
                resolve(books)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    countAllSearchBooks(keyword) {
        return new Promise(async (resolve, reject) => {
            try {
                const amount = models.books.count({
                    where: {
                        title: {
                            [sequelize.Op.substring]: keyword
                        }
                    }
                })
                resolve(amount)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getAllSearchBooks(keyword, page) {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * 6
                const books = models.books.findAll({
                    raw: true,
                    offset: offset,
                    limit: 6,
                    where: {
                        title: {
                            [sequelize.Op.substring]: keyword
                        }
                    }
                })
                resolve(books)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    getBookImages = (ID) => {
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

    getBookAuthors = (ID) => {
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
    // min_price, max_price, author, publisher, language
    getFilteredBook = (query, page) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = (page - 1) * 6
                let filteredBooks
                let count
                if (query.author != undefined) {
                    filteredBooks = await models.books.findAll({
                        raw: true,
                        offset: offset,
                        limit: 6,
                        where: { is_deleted: false },
                        include: {
                            model: models.authors,
                            as: "authors",
                            where: {
                                author_name: query.author
                            }
                        },
                    })
                    count = await models.books.count({
                        raw: true,
                        include: {
                            model: models.authors,
                            as: "authors",
                            where: {
                                author_name: query.author
                            }
                        },
                    })
                }
                else if (query.publisher != undefined) {
                    filteredBooks = await models.books.findAll({
                        raw: true,
                        offset: offset,
                        limit: 6,
                        where: {
                            publisher: query.publisher,
                            is_deleted: false
                        }
                    })
                    count = await models.books.count({
                        raw: true,
                        where: {
                            publisher: query.publisher,
                            is_deleted: false
                        }
                    })
                }
                else if (query.language != undefined) {
                    filteredBooks = await models.books.findAll({
                        raw: true,
                        offset: offset,
                        limit: 6,
                        where: {
                            language: query.language,
                            is_deleted: false
                        }
                    })
                    count = await models.books.count({
                        raw: true,
                        where: {
                            language: query.language,
                            is_deleted: false
                        }
                    })
                }
                else if (query.min_price != undefined && query.max_price != undefined) {

                    filteredBooks = await models.books.findAll({
                        raw: true,
                        offset: offset,
                        limit: 6,
                        where: {
                            price: {
                                [sequelize.Op.between]: [query.min_price * 1000, query.max_price * 1000]
                            },
                            is_deleted: false
                        }
                    })

                    count = await models.books.count({
                        raw: true,
                        where: {
                            price: {
                                [sequelize.Op.between]: [query.min_price * 1000, query.max_price * 1000]
                            },
                            is_deleted: false
                        }
                    })
                }
                resolve({ filteredBooks, count })
            }
            catch (err) {
                reject(err)
            }
        })
    }
    softdeleteBookByID = (ID) => {
        //Main idea: update attribute 'is_deleted' = true in table "books"
        return new Promise(async (resolve, reject) => {
            try {
                const book = await models.books.update({ is_deleted : true },{
                    raw: true,
                    where: { book_id: ID}
                })
                resolve(book)
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = new ProductServices
