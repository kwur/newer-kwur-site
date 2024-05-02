import { useNavigate } from "react-router-dom"
import { signup } from "../utils/userUtils"
const Signup = () => {
    const navigate = useNavigate()
    const handleSignup = (e) => {
        e.preventDefault()
        const firstName = e.target.firstname.value
        const lastName = e.target.lastname.value
        const username = e.target.username.value
        const password = e.target.password.value
        signup(firstName, lastName, username, password).then(result => {
            console.log("Login result", result)
            if(result === false) {
                alert("NOPE!")
            }
            if(result === "exists") {
                alert("user already exists. sorry buddy")
            }
            else {
                navigate("/dashboard")
            }
        })
    }
    return (<>
        <form onSubmit={handleSignup}>
            First
            <input id="firstname" type="text" className="border-2" />
            Last
            <input id="lastname" type="text"  className="border-2"/>
            User
            <input id="username" type="text"  className="border-2"/>
            Password
            <input id="password" type="password" className="border-2"/>
            <input type="submit"/>
        </form>
    </>)
}
export default Signup