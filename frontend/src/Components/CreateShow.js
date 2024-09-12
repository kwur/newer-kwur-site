import { useState } from "react"
import { tryToMakeShow } from "../utils/showUtils"
import { useNavigate } from "react-router-dom"
import UserSearch from "./UserSearch"
import TimePicker from "./TimePicker"

const CreateShow = () => {
    const navigate = useNavigate()
    const [showSecond, setShowSecond] = useState(false)
    const [showThird, setShowThird] = useState(false)
    const [firstChoiceTime, setFirstChoiceTime] = useState({startTime: undefined, endTime: undefined})
    const [secondChoiceTime, setSecondChoiceTime] = useState({startTime: undefined, endTime: undefined})
    const [thirdChoiceTime, setThirdChoiceTime] = useState({startTime: undefined, endTime: undefined})
    const [coDJ, setCoDJ] = useState()
    const timeValidation = (choice, numberChoice) => {
        const number = {
            1: "first",
            2: "second",
            3: "third"
        }
        if(choice.day === "[Select a Day]" || !choice.startTime || isNaN(choice.endTime)) { 
            return `Please choose a day, start time, and end time for your ${number[numberChoice]} choice, then submit again.`
        }
        const startHour = choice.startTime
        const startMinute = choice.startTime
        var endHour = choice.endTime
        var endMinute = choice.endTime
        if (endHour === 0) {
            endHour = 24;
            // endMinute = 59
        }
        if(startHour > endHour || (startHour === endHour && startMinute > endMinute)) {
            return "Please make sure that your show starts before it ends!"
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const showName = form.showName.value
        const genre = form.genre.value
        if(showName === "") {
            alert("Please pick a show name before continuing.")
            return
        }
        if(genre === "") {
            alert("Please pick a genre before continuing.")
            return
        }
        
        const firstChoiceDay = form.firstChoiceDay.value
        const firstChoiceStartTime = firstChoiceTime.startTime
        const firstChoiceEndTime = firstChoiceTime.endTime
        console.log(firstChoiceDay, firstChoiceStartTime, firstChoiceEndTime)
        if(firstChoiceDay === "[Select a Day]" || !firstChoiceStartTime  || isNaN(firstChoiceEndTime)) {
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
        if(firstChoice.endTime === 0) {
            firstChoice.endTime = 24;
        } // this is so stupid there must be a better way but idc
        var secondChoice = undefined
        var thirdChoice = undefined
        if(showSecond === true) {
            secondChoice = {
                day: form.secondChoiceDay.value,
                startTime: secondChoiceTime.startTime,
                endTime: secondChoiceTime.endTime,
            }
            error = timeValidation(secondChoice, 2)
            if(error) {
                alert(error)
                return
            }
            if(secondChoiceTime.endTime === 0) {
                secondChoiceTime.endTime = 24;
            }
        }
        if(showThird === true) {
            thirdChoice = {
                day: form.thirdChoiceDay.value,
                startTime: thirdChoiceTime.startTime,
                endTime: thirdChoiceTime.endTime,
            }
            error = timeValidation(thirdChoice, 3)
            if(error) {
                alert(error)
                return
            }
            if(thirdChoiceTime.endTime === 0) {
                thirdChoiceTime.endTime = 24;
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
                    <label>Show Name *</label>
                    <input id="showName" className="text-xl font-mono text-black border-2" type="text" />
                </div>
                <div className="flex flex-col">
                    <label>Genre *</label>
                    <input id="genre" className="text-xl font-mono text-black border-2" type="text" /> 
                </div>
                <div className="flex flex-col">
                    <label>Co-DJ (if applicable)</label>
                    {/* <input id="coDJ" className="text-xl font-mono text-black border-2" type="text" placeholder="optional" />  */}
                    <UserSearch getSelected={(selected) => {
                        const user = JSON.parse(selected)
                        setCoDJ(user)
                    }}/>
                </div>
                <div className="flex flex-col">
                    <label>First Choice: *</label>
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
                        {/* <input id="firstChoiceStartTime" className="text-xl font-mono text-black" type="time" /> */}
                        <TimePicker 
                            getAMPM={(AMPM) => {
                                if(AMPM === "AM" && firstChoiceTime.startTime === 12) {
                                    setFirstChoiceTime({startTime: 0, endTime: firstChoiceTime.endTime})
                                }
                                if(AMPM === "PM" && firstChoiceTime.startTime < 12) {
                                    setFirstChoiceTime({startTime: firstChoiceTime.startTime + 12, endTime: firstChoiceTime.endTime})
                                }
                            }}
                            getHour={(hour) => {
                                setFirstChoiceTime({startTime: parseInt(hour), endTime: firstChoiceTime.endTime})
                            }} 
                            id="firstChoiceStartTime" />
                    </div>
                    <div>
                        <label>End Time</label>
                        {/* <input id="firstChoiceEndTime" className="text-xl font-mono text-black" type="time" /> */}
                        <TimePicker 
                            getAMPM={(AMPM) => {
                                if(AMPM === "AM" && firstChoiceTime.endTime === 12) {
                                    setFirstChoiceTime({startTime: firstChoiceTime.startTime, endTime: 0})
                                }
                                if(AMPM === "PM" && firstChoiceTime.endTime < 12) {
                                    setFirstChoiceTime({startTime: firstChoiceTime.startTime, endTime: firstChoiceTime.endTime + 12})
                                }
                            }}
                            getHour={(hour) => {
                                setFirstChoiceTime({startTime: firstChoiceTime.startTime, endTime: parseInt(hour)})
                            }} />
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
                            <TimePicker 
                            getAMPM={(AMPM) => {
                                if(AMPM === "AM" && secondChoiceTime.startTime === 12) {
                                    setSecondChoiceTime({startTime: 0, endTime: secondChoiceTime.endTime})
                                }
                                if(AMPM === "PM" && secondChoiceTime.startTime < 12) {
                                    setSecondChoiceTime({startTime: secondChoiceTime.startTime + 12, endTime: secondChoiceTime.endTime})
                                }
                            }}
                            getHour={(hour) => {
                                setSecondChoiceTime({startTime: parseInt(hour), endTime: secondChoiceTime.endTime})
                            }} 
                             />  
                        </div>
                        <div>
                            <label>End Time</label>
                            <TimePicker 
                            getAMPM={(AMPM) => {
                                if(AMPM === "AM" && secondChoiceTime.endTime === 12) {
                                    setSecondChoiceTime({startTime: secondChoiceTime.startTime, endTime: 0})
                                }
                                if(AMPM === "PM" && secondChoiceTime.endTime < 12) {
                                    setSecondChoiceTime({startTime: secondChoiceTime.startTime, endTime: secondChoiceTime.endTime + 12})
                                }
                            }}
                            getHour={(hour) => {
                                setSecondChoiceTime({startTime: secondChoiceTime.startTime, endTime: parseInt(hour)})
                            }} />    
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
                            <label>Start Time</label>
                            <TimePicker 
                            getAMPM={(AMPM) => {
                                if(AMPM === "AM" && thirdChoiceTime.startTime === 12) {
                                    setThirdChoiceTime({startTime: 0, endTime: thirdChoiceTime.endTime})
                                }
                                if(AMPM === "PM" && thirdChoiceTime.startTime < 12) {
                                    setThirdChoiceTime({startTime: thirdChoiceTime.startTime + 12, endTime: thirdChoiceTime.endTime})
                                }
                            }}
                            getHour={(hour) => {
                                setThirdChoiceTime({startTime: parseInt(hour), endTime: thirdChoiceTime.endTime})
                            }} 
                             />                          </div>
                        <div>
                            <label>End Time</label>
                            <TimePicker 
                            getAMPM={(AMPM) => {
                                if(AMPM === "AM" && thirdChoiceTime.endTime === 12) {
                                    setThirdChoiceTime({startTime: thirdChoiceTime.startTime, endTime: 0})
                                }
                                if(AMPM === "PM" && thirdChoiceTime.endTime < 12) {
                                    setThirdChoiceTime({startTime: thirdChoiceTime.startTime, endTime: thirdChoiceTime.endTime + 12})
                                }
                            }}
                            getHour={(hour) => {
                                setThirdChoiceTime({startTime: thirdChoiceTime.startTime, endTime: parseInt(hour)})
                            }} />    
                        </div>
                    </div>
                }
            </div>
            <input type="submit" />
        </form>
    </>)
}

export default CreateShow