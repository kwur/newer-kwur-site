import { useState } from "react"
import UserSearch from "./UserSearch"
import { changeUserRole, removeOtherUser } from "../utils/userUtils"
import ChangeRolePopup from "./ChangeRolePopup"

const UserManagement = () => {
    const [selectedUser, setSelectedUser] = useState()
    const [showChangeRole, setShowChangeRole] = useState(false)
    return (<div className="border-2 border-black m-2 p-2 rounded w-fit">
    <div className="font-header text-3xl">
        User Management Console
    </div>
    { !selectedUser 
    ? <>
        <div className="font-mono">
            Search for a user to begin: 
        </div>
        <UserSearch getSelected={(u) => {
            setSelectedUser(JSON.parse(u))
        }} />
    </>
    : <>
    <div className="font-mono">
        For user: <span className="font-subtitle text-xl text-red-500">{selectedUser.firstName + " " + selectedUser.lastName}</span>
    </div>

    <div>
        <div>
            <button className="bg-red-500 p-1 m-1 hover:bg-red-700 text-white font-mono rounded"onClick={() => {
                const areYouSure = window.confirm("Are you sure you'd like to delete " + selectedUser.firstName + "'s KWUR account? This action is not reversible.")
                if(areYouSure === true) {
                    removeOtherUser(selectedUser._id).then(result => {
                        if(result === true) {
                            alert("User has been removed.")
                        }
                        else {
                            alert("Something went wrong.")
                        }
                    }).catch(e => {
                        console.log(e)
                        alert("Something went wrong.")
                    })
                }
            }}>Remove user</button>
        </div>
        <div>
            <button className="bg-red-500 p-1 m-1 hover:bg-red-700 text-white font-mono rounded"onClick={()=>setShowChangeRole(!showChangeRole)}>{showChangeRole === true ? "Hide change role menu" : "Change user role"}</button>
        </div>
        <ChangeRolePopup show={showChangeRole} user={selectedUser} />
    </div>

    <button className="border-2 border-red-500 p-1 m-1 hover:bg-gray-200 text-red-700 font-mono rounded"onClick={() => setSelectedUser()}>select another user</button>
    </>
    }
    </div>)
}
export default UserManagement