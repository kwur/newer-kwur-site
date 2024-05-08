
const express = require("express")
const passport = require("passport")
const showModel = require("../models/Show")
require("dotenv").config()

const router = express.Router()

const isGeorgeTime = (userFullName, choice) => {
    const choiceStartHour = parseInt(choice.startTime.substring(0, 2))
    const choiceEndHour = parseInt(choice.endTime.substring(0, 2))
    return userFullName !== "George Yeh" && choice.day === "Saturday" && choiceStartHour >= 9 && choiceEndHour < 12
}

const checkTime = async (userFullName, id, choices, showInfo) => {
    if(choices.length === 0) {
        return false // we checked everything, none worked
    }
    console.log(choices)
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
        if(isGeorgeTime(userFullName, choice) === true) { // only check if time is available if it is not George's
            choices.shift()
            return checkTime(userFullName, id, choices, showInfo)
        }
        try {
            const result = await showModel.findOne({ showTime: showTime })
            if(result === null) {
                // then the show time is not in any of the other shows, all good!
                try {
                    const makeANewShow = await showModel.create({
                        userId: id,
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
            return checkTime(userFullName, id, choices, showInfo)
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
            checkTime(userName, user._id, choices, showInfo).then(isTimeTaken => {
                console.log("Show was just attempted to be made. Was it successful?", isTimeTaken)
                if(isTimeTaken === true) {
                    res.status(201).send({message: "used a choice"})
                }
                else {
                    console.log("couldnt")
                    res.status(300).send({message: "all choices were taken"})
                }
            })
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