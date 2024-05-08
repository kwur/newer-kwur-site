
const express = require("express")
const passport = require("passport")
const showModel = require("../models/Show")
require("dotenv").config()

const router = express.Router()


const checkTime = async (id, choices, showInfo) => {
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
            return checkTime(id, choices, showInfo)
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
            checkTime(user._id, choices, showInfo).then(isTimeTaken => {
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


module.exports = router