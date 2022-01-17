const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authServices = require('../services/AuthServices')
const bcrypt = require('bcrypt')

let initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const userRecord = await authServices.findUser(username)
            /* console.log("Password hashed--------------------------------------")
            console.log(await bcrypt.compare(password, userRecord.password_hashed)) */
            if (userRecord && await bcrypt.compare(password, userRecord.password_hashed)) {
                return done(null, userRecord)
            } else {
                return done(null, false)
            }
        }
        catch (err) {
            console.log(err)
            return done(null, false)
        }
    }
    ))
}

passport.serializeUser((user, done) => {
    //console.log("passport.serializeUser----------------------")
    //console.log(user)
    done(null, {
        username: user.username,
        avatar_url: user.avatar_url,
        full_name: user.full_name
    })
})

passport.deserializeUser(async (user, done) => {
    // try {
    //     console.log("passport.deserializeUser----------------------")
    //     console.log(username)
    //     const userRecord = await authServices.findUser(username)
    //     if (userRecord) {
    //         return done(null, userRecord)
    //     } else {
    //         return done(null, false)
    //     }
    // }
    // catch (err) {
    //     console.log(error)
    //     return done(null, false)
    // }
    console.log("passport.deserializeUser----------------------")
    console.log(user)
    done(null, user)
})

module.exports = initPassportLocal;