import { useEffect, useState } from "react"
import Header from "./Header"
import { getLoggedInUser } from "../utils/userUtils"
import Loading from "./Loading"
import { Link, useNavigate } from "react-router-dom"
import GMDashboard from "./GMDashboard"
import Crediting from "./Crediting"

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
    return (<>
        <Header />
        { loading === true 
            ?  <Loading />
            : user.role === "dj" 
                ? <>
                    { Date.now().getFullYear() + " Exec Board:"}
                    <Link to="/dj/accountVerification">Need to create a GM acccount? Click here. </Link>
                </>
                : user.role === "GM" 
                    ? <GMDashboard />
                    : user.role === "personnel"
                        ? <Crediting />
                        : "Exec Dashboard"
        }
    </>)
}

export default ExecHome