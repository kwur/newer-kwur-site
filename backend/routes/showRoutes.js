
const express = require("express")
const passport = require("passport")
const showModel = require("../models/Show")
const userModel = require("../models/User")
require("dotenv").config()

const router = express.Router()

const isGeorgeTime = (userFullName, choice) => {
    const choiceStartHour = parseInt(choice.startTime.substring(0, 2))
    const choiceEndHour = parseInt(choice.endTime.substring(0, 2))
    return userFullName !== "George Yeh" && choice.day === "Saturday" && choiceStartHour >= 9 && choiceEndHour < 12
}

const bumpShowHolder = async (showHolder, oldShow, showStealer, newShow) => {
    // remove original show
    await showModel.findByIdAndDelete(oldShow._id)
    // create the new show for the show stealer
    console.log(newShow.showTime)
    try {
        await showModel.create({
            userId: showStealer._id,
            coDJ:   newShow.showInfo.coDJ,
            genre: newShow.showInfo.genre,
            showName: newShow.showInfo.showName,
            showTime: newShow.showTime
        })
    } catch (e) { 
        console.log(e)
    }
    // attempt to create show for showHolders other choices
    console.log("show holder", showHolder)
    checkTime(showHolder, showHolder.choices, oldShow)
    // checkTime(showHolder,  )
    // checkTime(showHolder, show)
    // shoot them an email 
}

const checkTime = async (user, choices, showInfo) => {
    if(choices.length === 0) {
        return false // we checked everything, none worked
    }
    console.log("HUH", choices)
    const choice = choices[0]
    if(choice !== null) {
        const startTime = choice.startTime
        const endTime = choice.endTime
        const day = choice.day
        const showTime = {
            day: day,
            startTime: startTime,
            endTime: endTime
        }
        var canMakeTheShow = false
        if(isGeorgeTime(user.firstName + " " + user.lastName, choice) === true) { // only check if time is available if it is not George's
            choices.shift()
            return checkTime(user, choices, showInfo)
        }
        try {
            const result = await showModel.findOne({ showTime: showTime })
            if(result !== null) {
                // if someone has a show at that time, who has more credits?
                console.log(result)
                userModel.findById(result.userId).then(showHolder => {
                    if(showHolder) {
                        const holderCredits = showHolder.credits
                        const attempterCredits = user.credits
                        if(holderCredits >= attempterCredits)  {
                            console.log("the holder of the show has more credits")
                            choices.shift()
                            return checkTime(user, choices, showInfo)
                        }
                        else {
                            console.log("attempter has more credits - bumping the holder")
                            canMakeTheShow = true
                            bumpShowHolder(showHolder, result, user, {showInfo: showInfo, showTime: showTime})
                        }
                    }
                })
            }
            if(result === null || canMakeTheShow) {
                // then the show time is not in any of the other shows, all good!
                try {
                    const makeANewShow = await showModel.create({
                        userId: user._id,
                        coDJ: showInfo.coDJ,
                        genre: showInfo.genre,
                        showName: showInfo.showName,
                        showTime: showTime
                    })
                    if(makeANewShow) {
                        return true
                    }
                }
                catch (e) {
                    console.log(e)
                    if(e.errorResponse.code === 11000) {
                        return "user already has show"
                    }
                    return false
                }
            }
            choices.shift()
            return checkTime(user, choices, showInfo)
        }
        catch (e) { 
            console.log(e)
            return false
        }
    }
    return false
}

router.post("/attemptCreateNewShow", (req, res) => {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: error })
        }
        else if (!user) {
            res.status(401).send({ error: "invalid auth" })
        }
        else {
            const choices = req.body.choices
            const showInfo = req.body.showInfo
            const userName = user.firstName + " " + user.lastName
            console.log(userName)
            userModel.findByIdAndUpdate(user._id, { $set: {
                choices: choices
            }}, {new: true}).then(newUser =>  {
                console.log("new  User",newUser)
                checkTime(newUser, choices, showInfo).then(isTimeTaken => {
                    console.log("Show was just attempted to be made. Was it successful?", isTimeTaken)
                    if(isTimeTaken === true) {
                        res.status(201).send({message: "used a choice"})
                    }
                    else if(isTimeTaken === false) {
                        res.status(200).send({message: "all choices were taken"})
                    }
                    else {
                        res.sendStatus(500)
                    }
                })
            }).catch(e => console.log(e))
        }
    })(req, res)
})

router.get("/findShowForUser", (req, res) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: error })
        }
        else if (!user) {
            res.status(401).send({ error: "invalid auth" })
        }
        else {
            showModel.findOne({userId: user._id}).then(show => {
                console.log(show)
                if(show) {
                    res.status(200).send({show: show})
                }
                else {
                    res.sendStatus(404)
                }
            }).catch(e => {
                console.log(e)
                res.sendStatus(500)
            })
        }
    })(req, res)
})

module.exports = router