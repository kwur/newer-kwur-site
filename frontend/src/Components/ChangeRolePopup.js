import { useState } from "react"
import { changeUserRole } from "../utils/userUtils"

const ChangeRolePopup = (props) => {
    const [newRole, setNewRole] = useState()

    const dropdown = <select 
        onChange={(e) => {
            setNewRole(e.target.value)
        }}>
        <option selected={newRole==="dj"} value="dj">DJ</option>
        <option selected={newRole==="personnel"} value="personnel">Personnel</option>
        <option selected={newRole==="exec"} value="exec">Exec</option>
    </select>
    return (<div className={`${props.show === false ? "hidden" : ""}`}>
        Changing {props.user.firstName}'s role. 
        { newRole 
            ? <>
                Change to {dropdown}?
                <button onClick={() => {
                    changeUserRole(props.user._id, newRole).then(result => {
                        console.log(result)
                    })
                }}>Yes</button>
                <button onClick={()=>setNewRole()}>Cancel</button>
            </>
            : 
            dropdown
        }
    </div>)
}
export default ChangeRolePopup