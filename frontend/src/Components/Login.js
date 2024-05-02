import { useNavigate } from "react-router"
import { login } from "../utils/userUtils"
const Login = () => {
    const nav = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        login(username, password).then(result => { 
            console.log("Login result", result)
            if(result.error === '"incorrect password"') {
                alert("That's not the right password!")
            }
            else {
                nav("/dashboard")
            }
        })
    }
    return (<>
        <form onSubmit={handleLogin}>
            Email
            <input id="username" type="text" className="border-solid"/>
            Password
            <input id="password" type="password" className="border-solid"/>
            <input type="submit"/>
        </form>
    </>)
}
export default Login