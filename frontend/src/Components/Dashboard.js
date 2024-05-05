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
            if(!user) {
                setUser(loggedInUser)
            }
        }).catch(e => console.log("Error calling userUtils.getLoggedInUser in Dashboard.js"))
    })
    return (<>
    <Header />
    <div className="flex justify-center">
        <div className="flex-col w-fit">
            <div className="font-header text-red-500 text-6xl pt-10 text-center">
                {user?.firstName}'s Dashboard
            </div>
            <div className="text-red-500 font-subtitle text-4xl pt-10 text-center">
            </div>
        </div>
    </div>
    </>)
}
export default Dashboard 