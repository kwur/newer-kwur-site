
const express = require("express")
const passport = require("passport")
const showModel = require("../models/Show")
const userModel = require("../models/User")
const emailer = require("../sendEmail")
require("dotenv").config()

const router = express.Router()

const isGeorgeTime = (userFullName, choice) => {
    const choiceStartHour = choice.startTime
    const choiceEndHour = choice.endTime
    return userFullName !== "George Yeh" && choice.day === "Saturday" && choiceStartHour >= 9 && choiceEndHour < 12
}

// check if time is overlapping
const isTimeAvailable = (time) => {
    return showModel.find({"showTime.day": time.day}).then(existingTimes => {
        for(var index in existingTimes) {
            const show = existingTimes[index]
            const existingTime = show.showTime
            const startAfterExistingShowEnds = time.startTime >= existingTime.endTime

            const endBeforeExistingShowStarts = time.endTime <= existingTime.startTime
            const startBeforeExistingShowEnds = time.startTime <= existingTime.endTime
            // if the new show starts after an existing show ends, we don't care because there is no possible overlap
            // otherwise, the new show has to both start before the existing one ends and end before the existing one starts in order to not overlap
            if((startAfterExistingShowEnds === true) || (startBeforeExistingShowEnds === true && endBeforeExistingShowStarts === true)) {
                // continue, only leaving this here because it is more intuitive to me to think of how a show can work than the opposite. 
            }
            else {
                return show // the show cannot happen, we don't need to check anyone else
            }
        }
    })
}

const bumpShowHolder = async (showHolder, oldShow, showStealer, newShow) => {
    // remove original show
    await showModel.findByIdAndDelete(oldShow._id)
    // create the show for the show stealer
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
    const madeNewShow = await checkTime(showHolder, showHolder.choices, oldShow)

    if(madeNewShow === true) {
        return showModel.findOne({userId: showHolder._id}).then(async newShow => {
            const contents = "<h1>Your show time got moved to another choice.</h1><div>Hi " + showHolder.firstName + ", looks like someone with more credits bumped you out of your current show time. We have rescheduled you to " + newShow.showTime.day + "s at " + newShow.showTime.startTime + " to " + newShow.showTime.endTime + ". Reply to this email if that is a problem, or re-fill out the show form on <a href=\"http://kwur.wustl.edu\">kwur.wustl.edu</a></div>"
            await emailer(showHolder.email, undefined, false, "Nards! Your Show Got Bumped -- KWUR", contents)
            return true
        }).catch (e => {
            console.log("error in finding the new show", e)
            return undefined
        })
    }
    else {
        const contents = "<h1>Your show time got canceled.</h1><div>Hi " + showHolder.firstName + ", looks like someone with more credits bumped you out of your current show time. It looks like you either didn't provide other choices or all of your other choices were taken. Please re-fill out the show form on <a href=\"http://kwur.wustl.edu\">kwur.wustl.edu</a></div> or reply to this email for further help."
        await emailer(showHolder.email, undefined, false, "IMPORTANT - Your Show Got Removed -- KWUR", contents)
        return true
    }
}

const checkTime = async (user, choices, showInfo) => {
    if(choices.length === 0) {
        return false // we checked everything, none worked
    }
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
        if(isGeorgeTime(user.firstName + " " + user.lastName, choice) === true) { // only check if time is available if it is not George's
            choices.shift()
            return checkTime(user, choices, showInfo)
        }
        try {
            var canMakeTheShow = false
            const overlappingShow = await isTimeAvailable(choice)
            if(overlappingShow) {
                // if someone has a show at that time, who has more credits?
                return userModel.findById(overlappingShow.userId).then(async showHolder => {
                    if(showHolder) {
                        const holderCredits = showHolder.credits
                        const attempterCredits = user.credits
                        if(holderCredits >= attempterCredits)  {
                            choices.shift()
                            return checkTime(user, choices, showInfo)
                        }
                        else {
                            canMakeTheShow = true
                            return await bumpShowHolder(showHolder, overlappingShow, user, {showInfo: showInfo, showTime: showTime})
                        }
                    }
                })
            }
            if(!overlappingShow || canMakeTheShow) {
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
                choices.shift()
                return checkTime(user, choices, showInfo)
            }
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
            userModel.findByIdAndUpdate(user._id, { $set: {
                choices: choices
            }}, {new: true}).then(newUser =>  {
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

router.delete("/deleteShow", (req, res) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        if (error) {
            console.log(error)
            res.status(500).send({ error: error })
        }
        else if (!user) {
            res.status(401).send({ error: "invalid auth" })
        }
        else {
            showModel.findOneAndDelete({userId: user._id}).then(show => {
                if(show) {
                    res.sendStatus(200)
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