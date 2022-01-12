class ErrorsController {
    
    // [GET]  /404
    notFound(req, res) {
        res.render('errors/404')
    }
}

module.exports = new ErrorsController