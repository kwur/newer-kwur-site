import { useState } from "react"
import { changeUserRole } from "../utils/userUtils"

const ChangeRolePopup = (props) => {
    const [newRole, setNewRole] = useState("dj")

    const dropdown = <select 
        className="font-mono px-2 text-md"
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
    return (<div className={`${props.show === false ? "hidden" : ""} font-subtitle text-xl`}>
        { newRole 
            ? <>
                Change to {dropdown}?
                <button 
                className="bg-green-500 p-1 m-1 rounded hover:bg-green-800 hover:text-white"
                onClick={() => {
                    changeUserRole(props.user._id, newRole).then(result => {
                        if(result == true) {
                            alert("success!")
                        }
                        else {
                            alert("oopsies. something went wrong")
                        }
                    }).catch(e => {
                        console.log(e)
                        alert("erra")
                    })
                }}>Yes</button>
                <button 
                className="bg-red-500 p-1 m-1 rounded hover:bg-red-800 hover:text-white"
                onClick={()=>setNewRole()}>Cancel</button>
            </>
            : 
            <div>
                Changing {props.user.firstName}'s role to:
                {dropdown}
            </div>
        }
    </div>)
}
export default ChangeRolePopup