import { useEffect, useState } from "react"
import CreateShow from "./CreateShow"
import Header from "./Header"
import { findShowForUser } from "../utils/showUtils"
import { useNavigate } from "react-router-dom"

const Scheduler = () => {
    const [show, setShow] = useState(undefined)
    const navigate = useNavigate()
    useEffect(() => {
        if(!show) {
            findShowForUser().then(result => {
                if(result === 1) {
                    // user is not logged in
                    navigate("/login")
                }
                setShow(result)
            }).catch(e => console.log(e))
        }
    })
    return (
        <>
            <Header />
            { console.log(show)}
            {show ? 
            <>
                You already have a show scheduled!
                <div>
                    Show Name: {show.showName}
                </div>
                <div>
                    Show Day: {show.showTime.day}
                </div>
                <div>
                    Start Time: {show.showTime.startTime}
                </div>
                <div>
                    End Time: {show.showTime.endTime}
                </div>
                <div>
                    Genre: {show.genre}
                </div>
            </>
            :
            <div className="w-screen flex justify-center">
                <CreateShow />
            </div>
            }
        </>
    )
}
export default Scheduler