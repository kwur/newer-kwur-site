import { useEffect, useState } from "react"
import Header from "./Header"
import { getLoggedInUser } from "../utils/userUtils"
import Loading from "./Loading"
import { Link, useNavigate } from "react-router-dom"
import GMDashboard from "./GMDashboard"
import Crediting from "./Crediting"
import SetSchedulerStatus from "./SetSchedulerStatus"
import UploadFile from "./UploadFile"
import ExecBoard from "./ExecBoard"

const ExecHome = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        getLoggedInUser().then(u => {
            console.log(u)
            if(u === 1) {
                navigate("/login")
            }
            setLoading(false)
            if(!user) {
                setUser(u)
                console.log(u)
            }
        })
    })
    return (<div className="w-screen mx-auto">
        <Header />
        { loading === true 
            ?  <Loading />
            : user?.role === "dj" 
                ? <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                        <div className="font-header text-3xl lg:pt-0 pt-20 pb-10">
                            { new Date().getFullYear() + " Exec Board:" }
                        </div>
                        <ExecBoard />
                        <Link to="/dj/accountVerification" className="pb-10 text-center fixed bottom-0 font-subtitle text-2xl lg:hover:text-red-500 lg:hover:text-3xl">Need to create a GM acccount? Click here. </Link>
                    </div>
                </div>
                : <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                        <div className="font-header text-6xl">
                            hello
                        </div>
                        <UploadFile />
                        {
                            user?.role === "GM" 
                                ? <GMDashboard />
                                : user?.role === "personnel"
                                    ? <>
                                        <Crediting />
                                        <SetSchedulerStatus />
                                    </>
                                    : "Exec Dashboard"

                        }
                    </div>
                </div>
        }
    </div>)
}

export default ExecHome