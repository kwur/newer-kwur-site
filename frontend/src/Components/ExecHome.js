import { useEffect, useState } from "react"
import Header from "./Header"
import { getLoggedInUser } from "../utils/userUtils"
import Loading from "./Loading"

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
                "Here's your current exec board: [TODO]" : 
                "Exec Dashboard"
        }
    </>)
}

export default ExecHome