const express = require("express")
const sendEmail = require("../sendEmail")
const tokenModel = require("../models/Token")
const JWT = require("jsonwebtoken")
const passport = require("passport")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const userModel = require("../models/User")
const Strategy = require("passport-local").Strategy
const JWTstrategy = require("passport-jwt").Strategy
const JWTextract = require("passport-jwt").ExtractJwt

const router = express.Router()


router.post("/login", (req, res, next) => {
    passport.authenticate("login",
        {session: false},
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
                        const token = JWT.sign({ userId: user._id, email: user.email, password: user.password, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET, { expiresIn: "48h" })
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
    passport.authenticate("signup", 
    {session: false},
    (error, info) => {
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
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
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

router.post("/userSearch", (req, res) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: error })
        }
        else if (!user) {
            res.status(401).send({ error: "invalid auth" })
        }
        else {
            userModel.find({
                $or: [
                    {
                        firstName: {
                            $regex: req.body.search,
                            $options: "i"
                        },
                    },
                    {
                        lastName: {
                            $regex: req.body.search,
                            $options: "i"
                        },
                    },
                    {
                        email: {
                            $regex: req.body.search,
                            $options: "i"
                        }
                    }
                ]
            }).then(results => {
                if(results) {
                    res.status(200).send({searchResults: results})
                }
            }).catch(e => {
                console.log(e)
                res.status(500).send({error: e})
            })
        }
    })(req, res)
})
module.exports = router