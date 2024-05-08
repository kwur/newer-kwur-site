import { useNavigate } from "react-router"
import { useState } from "react"
import { login } from "../utils/userUtils"
import Header from "./Header"
const Login = () => {
    const token = localStorage.getItem("token")
    const nav = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    if(token) {
        nav("/dashboard")
    }
    const handleLogin = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        login(username, password).then(result => { 
            console.log("Login result", result)
            if(result.error === '"incorrect password"') {
                alert("That's not the right password!")
            }
            else if(result.error === '"failed to serialize user"') {
                alert("Email does not exist")
            }
            else {
                nav("/dj/dashboard")
            }
        })
    }
    return (<>
        <Header />
        <div className="flex justify-center pt-10">
            <form onSubmit={handleLogin}>
                <div className="flex flex-col w-80">
                    <div className="font-header text-red-500 text-5xl text-center pb-10 ">
                        Sign In
                    </div>
                    <div className="group flex flex-col pb-10 w-100">
                        <label className="group-focus-within:text-red-500 pr-10 w-100 text-2xl font-subtitle" htmlFor="username">
                            e m a i l
                        </label>
                        <input id="username" type="text" className="font-mono rounded border-2 border-black focus:outline-red-500 p-1 w-100"/>
                    </div>
                    <div className="group flex flex-col pb-10 w-100">
                        <label className="group-focus-within:text-red-500 pr-10 w-100 text-2xl font-subtitle" htmlFor="username">
                            p a s s w o r d
                        </label>
                        <div className="flex flex-col w-100 relative">
                            <input type={`${showPassword === false ? "password" : "text"}`} id="password" className="font-mono rounded border-black border-2 group-focus:text-red-500 focus:outline-red-500 p-1 w-100"/>
                            <span className="right-2 top-[11px] absolute">
                                <div className={showPassword === true ? "hover:cursor-pointer h-4 w-4 bg-no-repeat bg-show bg-cover": "hover:cursor-pointer h-4 w-4 bg-no-repeat bg-cover bg-hide"} onClick={() => setShowPassword(!showPassword)}>
                                
                                </div>
                            </span>
                        </div>
                    </div>
                    <input className="font-subtitle w-fit bg-red-500 px-5 py-2 text-xl hover:bg-red-600 hover:text-white hover:cursor-pointer rounded font-subtitle" type="submit"/>
                </div>
            </form>
        </div>
    </>)
}
export default Login