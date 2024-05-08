
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require("dotenv").config()
const userRoutes = require("./routes/userRoutes")
const showRoutes = require("./routes/showRoutes")
const session = require("express-session") 
const cors = require('cors')  
const Strategy = require("passport-local").Strategy
const port = process.env.PORT || 3000

// connect to database
mongoose.connect(process.env.URI)

const DEBUGGING = process.env.DEBUGGING
const url = DEBUGGING === "true" ? process.env.DEBUGGING_FRONTEND_URL : process.env.FRONTEND_URL // where the request is coming from (frontend)
app.use(cors({ credentials: true, origin: url }));
app.use(function (req, res, next) { // https://enable-cors.org/server_expressjs.html
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

require("./auth")(app)


// require("dotenv").config()
// const express = require('express')
// const app = express()
// const mongoose = require("mongoose")
// const sendEmail = require("./sendEmail")
// const tokenModel = require("./models/Token")
// const showModel = require("./models/Show")
// const JWT = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
// const crypto = require("crypto")
const userModel = require("./models/User")
const passport = require("passport")
// const Strategy = require("passport-local").Strategy
const JWTstrategy = require("passport-jwt").Strategy
const JWTextract = require("passport-jwt").ExtractJwt
// const port = process.env.PORT || 3000
// const userRoutes = require("./routes/userRoutes")
// const showRoutes = require("./routes/showRoutes")
// const cors = require('cors')

const strategy = new Strategy(userModel.authenticate())
passport.use(strategy);
passport.serializeUser((user, next) => { // take the user info that is currently in JSON form and encrypt user information in the form of JWT
    next(null, user._id)
})
passport.deserializeUser((id, next) => { // go from encrypted data and return the user JSON object
    userModel.findById(id).then((user) => { // look in the collection for a user with the given id
        return next(null, user)
    }).catch(e => next(e, null))
})
passport.use("jwt", new JWTstrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: JWTextract.fromAuthHeaderWithScheme('Bearer')
    },
    (token, next) => {
        userModel.findOne({ _id: token.userId }).then((user) => {
            if(user) {
                return next(null, user)
            }
            else {
                return next(null, false)    
            }
        }).catch(error => {
            return next(error)
        })
    }
))


passport.use("login", new Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    (req, email, password, next) => { // create a strategy for authentication, setup what we will do during auth 
        userModel.findOne({ email: email }).then((user) => {
            if (!user) {
                return next(null, null, { message: "this email does not have as associated account" })
            }
            user.comparePassword(password)
                .then((res) => {
                    if (res === undefined) {
                        return next("something went wrong while comparing")
                    }
                    if (res === false) {
                        return next("incorrect password")
                    }
                    return next(null, user, null)
                }).catch(e => next(e, null, null))
        }).catch((e) => {
            next(e, null, null)
        })
    }))

passport.use("signup", new Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
    (req, email, password, callback) => {
        const body = req.body
        const first = body.firstName
        const last = body.lastName
        userModel.create({ email: email, password: password, firstName: first, lastName: last}).then((user) => {
            return callback(null, {
                "message": "success",
                "user": user
            })
        }).catch(e => {
            if (e.code === 11000) {
                console.log("we already have this user")
                callback({
                    "error": "user already exists"
                }, null)
            }
            else {
                console.log(e)
            }
        })
    }
))


app.use("/users", userRoutes)
app.use("/shows", showRoutes)




// open up backend on the given port
app.listen(port, () => {
    console.log(`KWUR backend listening on port ${port}`)
  })
