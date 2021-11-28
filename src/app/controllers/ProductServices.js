const { models } = require('../../config/db')
const sequelize = require('sequelize')
const { info } = require('node-sass')
const { updateProduct } = require('./ProductsController')
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
                await models.books.update(
                    { title: basicInfo.Title,
                      ISBN: basicInfo.isbn,
                      release_year: basicInfo.release_year,
                      price: basicInfo.sale_price,
                      publisher: basicInfo.publisher,
                      number_of_pages: basicInfo.page_num,
                      language: basicInfo.language
                    }, 
                    { raw: true,
                    where: { book_id: ID }
                })
                await models.authors.update(
                    { author_name: basicInfo.Author}, 
                    { raw: true,
                    where: { book_id: ID }
                })

                resolve("Book is updated!")
            }
            catch (err) {
                reject(err)
            }
        })
    }

    findMaxBookID = () =>{
        return new Promise(async (resolve, reject) => {
            try {
                const result = models.books.findAll({
                    raw: true,
                    nest: true,
                    attributes: [[sequelize.fn('max', sequelize.col('book_id')),'book_id']],
                    //attributes: [[sequelize.fn('DISTINCT', sequelize.col('author_name')), 'author']]
                })
                const max_cur_book_id = result
                resolve(max_cur_book_id)
            }
            catch (err) {
                reject(err)
            }
        })
    }

    addNewProduct = (basicInfo, images) => {
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
                const max_book_id_object = await this.findMaxBookID()
                const max_id = Math.max(parseInt(max_book_id_object[0].book_id),0) 

                const sale_price = basicInfo.sale_price || 50000

                await models.books.create(
                    { book_id: max_id + 1,
                      title: (basicInfo.Title || "New Title 2"), //value for not null attribute
                      ISBN: (basicInfo.isbn || 555555), //value for not null attribute
                      release_year: basicInfo.release_year,
                      price: sale_price,
                      publisher: basicInfo.publisher,
                      number_of_pages: (basicInfo.page_num || null),
                      language: basicInfo.language,
                      description: basicInfo.productDesc //not sure if can create
                    }, 
                    { raw: true
                })
                
                await models.authors.create(
                    { author_name: basicInfo.Author,
                        book_id: max_id + 1
                    }, 
                    { raw: true,
             
                })

                resolve("Book is create!")
            }
            catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = new ProductServices
