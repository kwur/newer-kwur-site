import { useEffect, useState } from "react"
import { approveOrDenyGMRequest, checkForUserToken, getUserById } from "../utils/userUtils"
import Login from "./Login"
import Header from "./Header"
import Loading from "./Loading"

const HandleGMRequest = () => {
    const [user, setUser] = useState()
    const searcher = new URLSearchParams(window.location.search)
    const [token, setToken] = useState()
    const [loading, setLoading] = useState(true)
    const userId = searcher.get("user")
    useEffect(() => {
        if(!token)  {
            var URLtoken = searcher.get("token")
            checkForUserToken(userId).then(doesItExist => {
                console.log(doesItExist)
                if(doesItExist === false) {
                    console.log("asdf")
                    setToken("")
                    setLoading(false)
                }
                else {
                    setToken(URLtoken)
                }
            }).catch(e => console.log(e))
        }
        if(userId && !user) {
            getUserById(userId).then(u => {
                setUser(u)
                setLoading(false)
            })
        }
    }, [])
    const handleDecision = (decision) => {
        if(userId) {
            approveOrDenyGMRequest(decision, token, userId).then(result => {
                if(result === true) {
                    // do something
                    setToken("")
                }
                else {
                    alert("Something went wrong. Please try again later!")
                }
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
    return (
    <>
    <Header />
    {
        loading === true ?
        <Loading /> :
        <div className="pt-10 flex font-mono justify-center">
            <div className="flex-col w-100">
                { console.log(token)}
                { token === "" ? 
                "This user does not have any currently pending GM requests."
                :
                localStorage.getItem("token") && user ? 
                    <>
                        <h1 className="text-3xl text-red-500 w-fit">Would you like to approve {user.firstName} {user.lastName}'s GM account?</h1>
                        <div className="flex m-5 space-x-5 justify-center">
                            <button className="hover:bg-green-700 w-fit text-white bg-green-500 rounded p-5" onClick={handleApprove}>Yes</button>
                            <button className="hover:bg-red-700 w-fit text-white bg-red-500 rounded p-5" onClick={handleDeny}>No</button>
                        </div>
                    </>
                    :
                    <Login redirect={redirectURL} />
                }

            </div>
            
        </div>
    }
    </>
    )
}

export default HandleGMRequest