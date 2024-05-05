const express = require("express")
const sendEmail = require("../sendEmail")
const tokenModel = require("../models/Token")
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const userModel = require("../models/User")
const passport = require("passport")
const Strategy = require("passport-local").Strategy
const JWTstrategy = require("passport-jwt").Strategy
const JWTextract = require("passport-jwt").ExtractJwt

const router = express.Router()
    

// setup passport
router.use(passport.initialize()) // setup
router.use(passport.session()) // keep local sessions
router.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})
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
    jwtFromRequest: JWTextract.fromAuthHeaderAsBearerToken()
},
    (token, next) => {
        userModel.findOne({ _id: token.userId }).then((user) => {
            return next(null, user)
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
        userModel.create({ "username": email, "email": email, "password": password, firstName: first, lastName: last}).then((user) => {
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


router.post("/login", (req, res, next) => {
    passport.authenticate("login",
        (error, user, info) => {
            if (error) {
                res.status(500).send({ "error": JSON.stringify(error) })
            }
            else if (user === null && !info) {
                res.status(500).send({ "error": "no user with that email" })
            }
            else {
                req.login(user, function (error) {
                    if (error) {
                        if (error === "incorrect password") {
                            res.status(401).send("incorrect password")
                        }
                        else {
                            res.status(500).send({ "error": "failed to serialize user" })
                        }
                    }
                    else {
                        const token = JWT.sign({ userId: user._id, "email": user.email, "firstName": user.firstName, "lastName": user.lastName, "role": user.role, "status": user.status }, process.env.JWT_SECRET, { expiresIn: "48h" })
                        res.send({ token: token })
                    }
                })
            }
        })(req, res, next)
})

router.post("/initiateReset", (req, res) => {
    const email = req.body.email
    userModel.findOne({ email: email }).then((user) => {
        if (!user) {
            return next(null, null, { message: "user does not exist" })
        }
        //really readable line of code to first locate any token that is associated with the user and delete it
        tokenModel.findOne({ userId: user._id }).then((oldToken) => tokenModel.deleteOne(oldToken).then((msg) => console.log(msg)).catch(e => console.log(e))).catch(e => console.log(e))
        const resetToken = crypto.randomBytes(32).toString("hex")
        bcrypt.hash(resetToken, Number(bcrypt.genSalt(10))).then((hash) => {
            tokenModel.create({
                userId: user._id,
                token: hash,
                createdAt: Date.now()
            }).then((createdToken) => {
                const resetLink = url + "/passwordReset?token=" + resetToken + "&user=" + user._id
                sendEmail(user.email, resetLink)
            }).catch(e => {
                res.status(418).send({ "error": e })
            }) // from https://blog.logrocket.com/implementing-secure-password-reset-node-js/#password-request-service
        }).catch(e => {
            res.status(418).send({ "message": "there was an error hashing the token", "error": e })
        })

    }).catch(e => {
        res.status(418).send({ "error": e })
    })
})

router.post("/resetPassword", (req, res) => {
    tokenModel.findOne({ userId: req.body.id }).then((tokenObject) => {
        if (!tokenObject) {
            res.status(418).send({ "message": "no token was found registered for this user" })
        }
        else {
            const token = tokenObject.token
            bcrypt.compare(req.body.token, token).then((validity) => {
                if (validity === true) {
                    bcrypt.hash(req.body.newPassword, Number(bcrypt.genSalt(10))).then((hashedPassword) => {
                        userModel.updateOne({ _id: req.body.id }, {
                            $set: {
                                password: hashedPassword
                            }
                        },
                            { new: true }
                        ).then(msg => {
                            if (msg.modifiedCount === 1) {
                                res.status(201).send({ message: "password successfully modified" })
                            }
                            else {
                                res.status(500).send({ message: "we were unable to modify password" })
                            }
                        })
                    }).catch(e => console.log(e))
                    tokenModel.deleteOne({ userId: req.body.id }).then((result) => {
                        if (result) {
                            return true
                        }
                    }).catch(e => e)

                }
                else {
                    res.status(401).send({ "message": "invalid token you suck" })
                }
            })
        }
    })
})

router.post("/signup", (req, res) => {
    passport.authenticate("signup", (error, info) => {
        if (error !== null) {
            res.status(500).send({ "error": error.error })
        }
        else {
            if (info.user) {
                res.send({
                    "message": "success!",
                    "user": info.user
                })
            }
            else {
                res.status(500).send({
                    "message": info
                })
            }
        }
    })(req, res)
})

router.get('/profile', (req, res) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        else if (!user) {
            res.status(401).send({ error: "invalid auth" })
        }
        else {
            res.send({ user: user })
        }
    })(req, res)
})

router.post("/findUser", (req, res) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        else if (!user) {
            res.status(401).send({ error: "invalid auth" })
        }
        else {
            userModel.findById(req.body.id).then(user => {
                if (user) {
                    res.status(200).send({ user: user })
                }
                else {
                    res.status(404).send({ message: "user not found" })
                }
            }).catch(e => res.status(500).send({ error: e }))
        }
    })(req, res)
})

router.post("/updateUserName", (req, res) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (error) {
            res.status(500).send({ error: error })
        }
        else if (!user) {
            res.status(401).send({ error: "invalid auth" })
        }
        else {
            userModel.findByIdAndUpdate(req.body.id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }).then(r => {
                if (r) {
                    res.status(201).send({ message: "updated successfully" })
                }
                else {
                    res.status(500).send({ message: "unable to update" })
                }
            }).catch(e => {
                console.log(e)
                res.status(500).send({ error: e })
            })
        }
    })(req, res)
})

router.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send({ message: "successfully logged out. be sure to remove the token from LS" })
        }
    })
})

module.exports = router