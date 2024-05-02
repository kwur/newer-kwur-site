import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

const Dashboard = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if(!token) {
            navigate("/login")
        }
    })
    return (<>
    <Header />
    this is the dashboard
    </>)
}
export default Dashboard 