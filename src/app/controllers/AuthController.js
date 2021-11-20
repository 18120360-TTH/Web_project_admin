class AuthController {
    // [GET]  /login
    login(req, res) {res.render('auth/login')}

    // [GET]  /signup
    //signup(req, res) {res.render('auth/register')}

    // [GET]  /password-recovery
    //pass_recover(req, res) {res.render('auth/password-recovery')}
}

module.exports = new AuthController