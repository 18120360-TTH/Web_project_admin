const { models } = require('../../config/db')
const sequelize = require('sequelize')
class ProductServices {

    countAllBooks = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const amount = models.books.count()
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
                const books = models.books.findAll({ raw: true, offset: offset, limit: 6 })
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
                    attributes: [[sequelize.fn('DISTINCT', sequelize.col('publisher')), 'publisher']]
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
                const book = models.books.findByPk(ID, { raw: true })
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
                            publisher: query.publisher
                        }
                    })
                    count = await models.books.count({
                        raw: true,
                        where: {
                            publisher: query.publisher
                        }
                    })
                }
                else if (query.language != undefined) {
                    filteredBooks = await models.books.findAll({
                        raw: true,
                        offset: offset,
                        limit: 6,
                        where: {
                            language: query.language
                        }
                    })
                    count = await models.books.count({
                        raw: true,
                        where: {
                            language: query.language
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
                            }
                        }
                    })



                    count = await models.books.count({
                        raw: true,
                        where: {
                            price: {
                                [sequelize.Op.between]: [query.min_price * 1000, query.max_price * 1000]
                            }
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
}

module.exports = new ProductServices
