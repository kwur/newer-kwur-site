import { useEffect, useState } from "react"
import CreateShow from "./CreateShow"
import Header from "./Header"
import { checkIfSchedulerOpen, findShowForUser, removeShowForUser } from "../utils/showUtils"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"

const Scheduler = () => {
    const [show, setShow] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [schedulerOpen, setSchedulerOpen] = useState(false)
    const navigate = useNavigate()
    const hourToTime = (hour) => {
        if (hour === 0) {
            return "12:00 AM";
        }
        if (hour === 12) {
            return "12:00 PM";
        }
        if (hour < 12) {
            return hour + ":00 AM";
        } else {
            return hour - 12 + ":00 PM";
        }
    };
    useEffect(() => {
        const getInfo = async () => {
            if(!show) {
                try {
                    const result = await findShowForUser()
                    if(result === 1) {
                        // user is not logged in
                        navigate("/login")
                    }
                    else if(result === 2) {
                        navigate("/pending")
                    }
                    setShow(result)
                    const open = await checkIfSchedulerOpen()
                    console.log("scheduler open?", open)
                    if(open === true || open === false) { //stupid JS truthy
                        setSchedulerOpen(open)
                        setLoading(false)
                    }
                    else {
                        alert("Something went wrong loading the scheduler. Please try again later.")
                        navigate("/dj/dashboard")
                    }
                }
                catch(e) {
                    console.log(e)
                    setLoading(false)
                }
            }
        }
        getInfo()
    })
    return (
        <div className="w-screen mx-auto">
            <Header />
            { loading === false ?
                show ? 
                <div className="flex justify-center w-screen mx-auto">
                    <div className="flex flex-col align-middle mt-20  w-fit">
                        <h1 className="font-header text-center align-middle text-5xl">Your Show</h1>
                        <div className="text-red-500 text-center font-mono text-4xl lg:text-8xl">
                            {show.showName}
                        </div>
                        <div className="font-mono text-center text-lg">
                            {show.showTime.day + "s"}, 
                            {" " + hourToTime(show.showTime.startTime)} to {hourToTime(show.showTime.endTime)}
                        </div>
                        <div className="text-gray-500 text-center font-mono">
                            {show.genre}{show.coDJ && ", with " + show.coDJ.firstName + " " +show.coDJ.lastName}
                        </div>
                        <button className="bg-red-500 m-2 rounded p-2 text-white font-mono hover:bg-red-700" onClick={()=>{
                            removeShowForUser().then(result => {
                                if(result === true) {
                                    setShow(undefined)
                                }
                                else {
                                    alert("Something went wrong. Please try again later.")
                                }
                            })
                        }}>Cancel this show</button>
                    </div>
                </div>
                :    
                    schedulerOpen === true 
                        ?
                        <div className="w-screen flex justify-center">
                            <CreateShow />
                        </div>
                        : <div>
                            Scheduler is currently closed.
                        </div>
                :
                <Loading />
            }
        </div>
    )
}
export default Scheduler