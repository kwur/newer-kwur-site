import { useEffect, useState } from "react"
import CreateShow from "./CreateShow"
import Header from "./Header"
import { findShowForUser } from "../utils/showUtils"

const Scheduler = () => {
    const [show, setShow] = useState(undefined)
    useEffect(() => {
        if(!show) {
            findShowForUser().then(result => {
                setShow(result)
            }).catch(e => console.log(e))
        }
    })
    return (
        <>
            <Header />
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