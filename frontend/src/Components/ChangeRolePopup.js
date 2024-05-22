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
        <option selected={newRole==="treasurer"} value="treasurer">Treasurer</option>
        <option selected={newRole==="training"} value="training">Training</option>
        <option selected={newRole==="promotions"} value="promotions">Promotions</option>
        <option selected={newRole==="communityrelations"} value="communityrelations">Community Relations</option>
        <option selected={newRole==="artdirector"} value="artdirector">Art Director</option>
        <option selected={newRole==="events"} value="events">Events</option>
        <option selected={newRole==="productioncoordinator"} value="productioncoordinator">Production Coordinator</option>
        <option selected={newRole==="musicdirectorintraining"} value="musicdirectorintraining">Music Director in Training</option>
        <option selected={newRole==="stationmanager"} value="stationmanager">Station Manager</option>
        <option selected={newRole==="webmaster"} value="webmaster">Webmaster</option>
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