class AuthController {
    // [GET]  /login
    loginView(req, res) {
        if (req.query.failed) {
            res.render('auth/login', {
                layout: 'auth-layout.hbs',
                msg: 'Username or password is incorrect!'
            })
        } else {
            res.render('auth/login', { layout: 'auth-layout.hbs' })
        }
    }

    // [POST] /login
    login(req, res) {
        res.locals.user = req.user
        res.redirect('/')
    }

    // [GET] /logout
    logout(req, res) {
        req.logout()
        res.redirect('/')
    }

    authenCheck(req, res, next) {
        // console.log(req.user)
        if (!req.isAuthenticated()) {
            res.redirect('/auth/login')
        } else {
            console.log(req.user)
            res.locals.user = req.user
            next();
        }
    }

}

module.exports = new AuthController