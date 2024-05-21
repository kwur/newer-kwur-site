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
        <>
            <Header />
            { loading === false ?
                show ? 
                <div className="flex flex-col align-middle justify-center w-fit">
                    <h1 className="font-header text-center align-middle text-4xl">Your Show</h1>
                    <div className="text-red-500 font-mono text-xl">
                        {show.showName}
                    </div>
                    <div className="font-mono text-lg">
                        {show.showTime.day}
                    </div>
                    <div className="font-mono">
                        {hourToTime(show.showTime.startTime)} to {hourToTime(show.showTime.endTime)}
                    </div>
                    <div className="text-gray-500 font-mono">
                        {show.genre}
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
        </>
    )
}
export default Scheduler