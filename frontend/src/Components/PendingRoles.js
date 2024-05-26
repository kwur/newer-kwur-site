import { useState, useEffect } from "react"
import { changeUserRole, getPendings, removeOtherUser } from "../utils/userUtils"
import { useNavigate } from "react-router-dom"

const PendingRoles = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    const handleApprove = (user) => {
        changeUserRole(user._id, "dj").then(status => {
            if(status === true) {
                alert("done")
            }
        }).catch(e => {
            console.log(e)
            alert("something went wrong blame vicky")
        })
    }
    const handleDeny = (user) => {
        const areYouSure = window.confirm("This will remove this users account. Are you sure you'd like to delete " + selectedUser.firstName + "'s KWUR account? This action is not reversible.")
        if(areYouSure === true) {
            removeOtherUser(user._id).then(status => {
                if(status === true) {
                    alert("done")
                }
            }).catch(e => {
                console.log(e)
                alert("something went wrong blame vicky")
            })
        }
    }
    useEffect(()=> {
        getPendings().then(collectedUsers => {
            if(collectedUsers === 1) {
                navigate("/")
            }
            setUsers(collectedUsers)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    return (<>
        {
            users ?
                users.map((user) => {
                    return <>
                        <h1 className="text-3xl text-red-500 w-fit">Would you like to approve {user.firstName} {user.lastName}'s DJ account?</h1>
                        <div className="flex m-5 space-x-5 justify-center">
                            <button className="hover:bg-green-700 w-fit text-white bg-green-500 rounded p-5" onClick={() => handleApprove(user)}>Yes</button>
                            <button className="hover:bg-red-700 w-fit text-white bg-red-500 rounded p-5" onClick={() => handleDeny(user)}>No</button>
                        </div>
                    </>
                })
            :
            <Login redirect={window.location.href} />
        }
    </>)
}