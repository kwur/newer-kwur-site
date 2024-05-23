import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import { getLoggedInUser } from "../utils/userUtils"

const Dashboard = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [user, setUser] = useState()
    useEffect(() => {
        if(!token) {
            navigate("/login")
        }
        getLoggedInUser().then(loggedInUser => {
            if(!loggedInUser) {
                //token was likely invalid
                localStorage.removeItem("token")
                // navigate("/login")
            }
            if(!user) {
                setUser(loggedInUser)
            }
        }).catch(e => console.log("Error calling userUtils.getLoggedInUser in Dashboard.js", e))
    })
    return (<div className="w-screen mx-auto">
    <Header />
    <div className="pt-20 lg:pt-0 flex justify-center">
        <div className="flex-col w-fit">
            <div className="font-header text-red-500 text-6xl pt-10 text-center">
                { user && <span>Welcome back {user.firstName} ;)</span>}  {/*  only show this once the user has loaded */}
            </div>
            <div className="text-red-500 font-subtitle text-4xl pt-10 text-center">
            </div>
        </div>
    </div>
    </div>)
}
export default Dashboard 