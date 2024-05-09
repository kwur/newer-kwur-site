import { useState } from "react"
import { tryToMakeShow } from "../utils/showUtils"
import { useNavigate } from "react-router-dom"

const CreateShow = () => {
    const navigate = useNavigate()
    const [showSecond, setShowSecond] = useState(false)
    const [showThird, setShowThird] = useState(false)
    const timeValidation = (choice, numberChoice) => {
        const number = {
            1: "first",
            2: "second",
            3: "third"
        }
        if(choice.day === "[Select a Day]" || choice.startTime === "" || choice.endTime === "") { 
            return `Please choose a day, start time, and end time for your ${number[numberChoice]} choice, then submit again.`
        }
        const startHour = choice.startTime
        const startMinute = choice.startTime
        const endHour = choice.endTime
        const endMinute = choice.endTime
        if(startHour > endHour || (startHour === endHour && startMinute > endMinute)) {
            return "Please make sure that your show starts before it ends!"
        }
    }
    const convertTimeToInt = (time) => {
        return parseInt(time.substring(0, 2))
    } 
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const showName = form.showName.value
        const genre = form.genre.value
        const coDJ = form.coDJ.value
        if(showName === "") {
            alert("Please pick a show name before continuing.")
            return
        }
        if(genre === "") {
            alert("Please pick a genre before continuing.")
            return
        }
        
        const firstChoiceDay = form.firstChoiceDay.value
        const firstChoiceStartTime = convertTimeToInt(form.firstChoiceStartTime.value)
        const firstChoiceEndTime = convertTimeToInt(form.firstChoiceEndTime.value)
        if(firstChoiceDay === "[Select a Day]" || firstChoiceStartTime === "" || firstChoiceEndTime === "") {
            alert("Please choose a day, start time, and end time for your first choice, then submit again.")
            return
        }
        // choice:
        // day: string,
        // start time: 24h str,
        // end time: 24h str,
        const firstChoice = {
            day: firstChoiceDay,
            startTime: firstChoiceStartTime,
            endTime: firstChoiceEndTime,
        }
        var error = timeValidation(firstChoice, 1)
        if(error) {
            alert(error)
            return
        }
        var secondChoice = undefined
        var thirdChoice = undefined
        if(showSecond === true) {
            secondChoice = {
                day: form.secondChoiceDay.value,
                startTime: convertTimeToInt(form.secondChoiceStartTime.value),
                endTime: convertTimeToInt(form.secondChoiceEndTime.value),
            }
            error = timeValidation(secondChoice, 2)
            if(error) {
                alert(error)
                return
            }
        }
        if(showThird === true) {
            thirdChoice = {
                day: form.thirdChoiceDay.value,
                startTime: convertTimeToInt(form.thirdChoiceStartTime.value),
                endTime: convertTimeToInt(form.thirdChoiceEndTime.value),
            }
            error = timeValidation(thirdChoice, 3)
            if(error) {
                alert(error)
                return
            }
        }
        const createdShow = {
            showName: showName,
            genre: genre,
            coDJ: coDJ === "" ? undefined : coDJ,
        }
        const choices = [firstChoice, secondChoice, thirdChoice]
        tryToMakeShow(choices, createdShow).then(result => {
            if(result === true ) { 
                alert("Your show has been created!")
                window.location.reload()
            }
            else if(result === false ) {
                alert("All of your choices were taken")
            }
            else {
                alert("Something went wrong.")
            }
        })
    }
    return (<>
        <form onSubmit={handleSubmit} className="flex flex-col w-80 text-red-500 font-subtitle text-2xl">
            <h1 className="font-header text-center text-4xl text-black py-10">New Show Form</h1>
            <div className="space-y-5">
                <div className="flex flex-col">
                    <label>Show Name</label>
                    <input id="showName" className="text-xl font-mono text-black border-2" type="text" />
                </div>
                <div className="flex flex-col">
                    <label>Genre</label>
                    <input id="genre" className="text-xl font-mono text-black border-2" type="text" /> 
                </div>
                <div className="flex flex-col">
                    <label>Co-DJ (if applicable)</label>
                    <input id="coDJ" className="text-xl font-mono text-black border-2" type="text" placeholder="optional" /> 
                    {/* TODO change this to user search box */}
                </div>
                <div className="flex flex-col">
                    <label>First Choice:</label>
                    <div>
                        <label>Day:</label>
                        <select id="firstChoiceDay" className="text-xl font-mono text-black ">
                            <option>[Select a Day]</option>
                            <option>Sunday</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                        </select>
                    </div>
                    <div>
                        <label>Start Time</label>
                        <input id="firstChoiceStartTime" className="text-xl font-mono text-black" type="time" />
                    </div>
                    <div>
                        <label>End Time</label>
                        <input id="firstChoiceEndTime" className="text-xl font-mono text-black" type="time" />
                    </div>
                    { showSecond === false &&
                    <div onClick={() => setShowSecond(true)} className="h-4 w-4 bg-cover m-3 bg-no-repeat bg-more hover:cursor-pointer">
                        
                    </div>
                    }
                </div>
                { showSecond === true && 
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <label className="leading-tight">Second Choice:</label>
                            { showSecond === true && showThird === false  && 
                                <div onClick={() => setShowSecond(false)} className="h-4 w-4 bg-cover mx-3 bg-no-repeat bg-less hover:cursor-pointer">
                                    
                                </div>
                            }
                        </div>
                        <div>
                            <label>Day:</label>
                            <select id="secondChoiceDay" className="text-xl font-mono text-black">
                                <option>[Select a Day]</option>
                                <option>Sunday</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                            </select>
                        </div>
                        <div>
                            <label>Start Time</label>
                            <input id="secondChoiceStartTime" className="text-xl font-mono text-black" type="time" />
                        </div>
                        <div>
                            <label>End Time</label>
                            <input id="secondChoiceEndTime" className="text-xl font-mono text-black" type="time" />
                        </div>
                        
                        {showThird === false && <div onClick={() => setShowThird(true)} className="h-4 w-4 bg-cover m-3 bg-no-repeat bg-more hover:cursor-pointer"></div>}
                    </div>
                }
                { showThird === true &&
                    <div>
                        <div className="flex items-center">
                            <label className="leading-tight">Third Choice:</label>
                            { showThird === true  && 
                                <div onClick={() => setShowThird(false)} className="h-4 w-4 bg-cover mx-3 bg-no-repeat bg-less hover:cursor-pointer">
                                    
                                </div>
                            }
                        </div>
                        <div>
                            <label>Day:</label>
                            <select id="thirdChoiceDay" className="text-xl font-mono text-black">
                                <option>[Select a Day]</option>
                                <option>Sunday</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                            </select>
                        </div>
                        <div>
                            <label>Start Time</label>
                            <input id="thirdChoiceStartTime" className="text-xl font-mono text-black" type="time" />
                        </div>
                        <div>
                            <label>End Time</label>
                            <input id="thirdChoiceEndTime" className="text-xl font-mono text-black" type="time" />
                        </div>
                    </div>
                }
            </div>
            <input type="submit" />
        </form>
    </>)
}

export default CreateShow