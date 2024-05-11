import { useEffect, useState } from "react"
import CreateShow from "./CreateShow"
import Header from "./Header"
import { findShowForUser, removeShowForUser } from "../utils/showUtils"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"

const Scheduler = () => {
    const [show, setShow] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        if(!show) {
            findShowForUser().then(result => {
                if(result === 1) {
                    // user is not logged in
                    navigate("/login")
                }
                setLoading(false)
                setShow(result)
            }).catch(e => {
                console.log(e)
                setLoading(false)
            })
        }
    })
    return (
        <>
            <Header />
            { loading === false ?
                show ? 
                <div className="flex flex-col align-middle justify-center">
                    Your Show:
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
                    <button onClick={()=>{
                        removeShowForUser().then(result => {
                            if(result === true) {
                                setShow(undefined)
                            }
                            else {
                                alert("Something went wrong. Please try again later.")
                            }
                        })
                    }}>Remove this show</button>
                </div>
                :
                <div className="w-screen flex justify-center">
                    <CreateShow />
                </div>
                :
                <Loading />
            }
        </>
    )
}
export default Scheduler