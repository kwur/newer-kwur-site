import { useState } from "react"
import UserSearch from "./UserSearch"
import { removeOtherUser } from "../utils/userUtils"
import ChangeRolePopup from "./ChangeRolePopup"

const UserManagement = () => {
    const [selectedUser, setSelectedUser] = useState()
    return (<>
    { !selectedUser 
    ? <>
        Select a user to begin: 
        <UserSearch getSelected={(u) => {
            setSelectedUser(JSON.parse(u))
        }} />
    </>
    : <>
    <div>
        For user: {selectedUser.firstName + " " + selectedUser.lastName}
    </div>

    <div>
        Actions:
        <button onClick={() => {
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
        <button>Change user role</button>
        <ChangeRolePopup show={true} user={selectedUser} />
        <button>Change user information</button>
    </div>

    <button onClick={() => setSelectedUser()}>select another user</button>
    </>
    }
    </>)
}
export default UserManagement