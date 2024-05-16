import { useEffect, useState } from "react"
import { approveOrDenyGMRequest, getUserById } from "../utils/userUtils"
import Login from "./Login"

const HandleGMRequest = () => {
    const [user, setUser] = useState()
    const searcher = new URLSearchParams(window.location.search)
    const token = searcher.get("token")
    const userId = searcher.get("user")
    useEffect(() => {
        if(userId && !user) {
            getUserById(userId).then(u => {
                setUser(u)
            })
        }
    })
    const handleDecision = (decision) => {
        if(userId) {
            approveOrDenyGMRequest(decision, token, userId).then(poopy => {
                console.log(poopy)
            }).catch(e => console.log(e))
        }
    }
    const handleApprove = () => {
        handleDecision(true)
    }
    const handleDeny = () => {
        handleDecision(false)
    }
    const redirectURL = "/createGM?token=" + token + "&user=" + userId
    return (<>
        { localStorage.getItem("token") && user ? 
        <>
            Would you like to approve {user.firstName} {user.lastName}'s GM account?
            <button onClick={handleApprove}>Yes</button>
            <button onClick={handleDeny}>No</button>
        </>
        :
        <Login redirect={redirectURL} />
        }
        
    </>)
}

export default HandleGMRequest