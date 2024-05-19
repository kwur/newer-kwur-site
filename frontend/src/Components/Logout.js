import { useNavigate } from "react-router-dom"
import { logout } from "../utils/userUtils"

const Logout = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        logout().then(success => {
            if(success === true) {
                navigate("/")
            }
            else {
                alert("Error logging out!")
            }
        })
    }
    return (<>
    <button className="align-baseline hover:text-white hover:font-bold hover:bg-red-700 h-fit px-2 rounded bg-red-500" onClick={handleLogout}>
        Log Out
    </button>
    </>)
}
export default Logout