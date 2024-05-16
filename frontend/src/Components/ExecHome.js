import { useEffect, useState } from "react"
import Header from "./Header"
import { getLoggedInUser } from "../utils/userUtils"
import Loading from "./Loading"
import { Link } from "react-router-dom"

const ExecHome = () => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getLoggedInUser().then(u => {
            setLoading(false)
            if(!user) {
                setUser(u)
                console.log(u)
            }
        })
    })
    return (<>
        <Header />
        { loading === true ? 
            <Loading />
            :
            user.role === "dj" ? 
            <>
                Here's your current exec board:
                <Link to="/dj/accountVerification">Need to create a GM acccount? Click here. </Link>
            </>
             : 
                "Exec Dashboard"
        }
    </>)
}

export default ExecHome