import { useNavigate } from "react-router-dom"
import { login, signup } from "../utils/userUtils"
import Header from "./Header"
import { Link } from "react-router-dom"
import { useState } from "react"
const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const handleSignup = (e) => {
        e.preventDefault()
        const firstName = e.target.firstname.value
        const lastName = e.target.lastname.value
        const username = e.target.username.value
        const password = e.target.password.value
        if(username.indexOf("@") < 0 || username.indexOf(".") < 0) {
            alert("Please choose a valid email.")
            return
        }
       
        signup(firstName, lastName, username, password).then(result => {
            console.log("Login result", result)
            if(result === false) {
                alert("NOPE!")
            } 
            if(result === "exists") {
                alert("user already exists. sorry buddy")
            }
            else {
                login(username, password).then(r => {
                    if(r) {
                        navigate("/dj/dashboard")
                    }
                }).catch(e => console.log(e))
            }
        }).catch(e => console.log(e))
    }
    return (<div className="w-screen mx-auto">
        <Header />
        <div className="flex justify-center pt-10">
        <form onSubmit={handleSignup}>
        <div className="flex flex-col w-80">
            <div className="font-header text-red-500 text-5xl text-center pb-10 ">
                Sign Up
            </div>
            <div className="group flex flex-col pb-10 w-100">
                <label className="tracking-mostwide group-focus-within:text-red-500 pr-10 w-100 text-2xl font-subtitle" htmlFor="username">
                    FIRST NAME
                </label>
                <input id="firstname" type="text" className="font-mono rounded border-2 border-black focus:outline-red-500 p-1 w-100"/>
            </div>
            <div className="group flex flex-col pb-10 w-100">
                <label className="tracking-mostwide group-focus-within:text-red-500 pr-10 w-100 text-2xl font-subtitle" htmlFor="username">
                    LAST NAME
                </label>
                <input id="lastname" type="text" className="font-mono rounded border-2 border-black focus:outline-red-500 p-1 w-100"/>
            </div>
            <div className="group flex flex-col pb-10 w-100">
                <label className="tracking-mostwide group-focus-within:text-red-500 pr-10 w-100 text-2xl font-subtitle" htmlFor="username">
                    EMAIL
                </label>
                <input id="username" type="text" className="font-mono rounded border-2 border-black focus:outline-red-500 p-1 w-100"/>
            </div>
            <div className="group flex flex-col pb-10 w-100">
                <label className="tracking-mostwide group-focus-within:text-red-500 pr-10 w-100 text-2xl font-subtitle" htmlFor="username">
                    PASSWORD
                </label>
                <div className="flex flex-col w-100 relative">
                    <input type={`${showPassword === false ? "password" : "text"}`} id="password" className="font-mono rounded border-black border-2 group-focus:text-red-500 focus:outline-red-500 p-1 w-100"/>
                    <span className="right-2 top-[11px] absolute">
                        <div className={showPassword === true ? "hover:cursor-pointer h-4 w-4 bg-no-repeat bg-show bg-cover": "hover:cursor-pointer h-4 w-4 bg-no-repeat bg-cover bg-hide"} onClick={() => setShowPassword(!showPassword)}>
                        
                        </div>
                    </span>
                </div>
            </div>
            <input value="Sign Up" className="font-subtitle w-fit bg-red-500 px-5 py-2 text-white text-xl hover:bg-red-700 hover:text-white hover:cursor-pointer rounded font-subtitle" type="submit"/>
            <div className="font-subtitle pt-10 text-2xl">
                Have an account? <Link className="text-red-500 hover:text-3xl hover:text-red-600" to="/login">Sign in here.</Link>
            </div>
       </div>
    </form>
            {/* <form onSubmit={handleSignup}>
                First Name
                <input id="firstname" type="text" className="border-2" />
                Last Name
                <input id="lastname" type="text"  className="border-2"/>
                Email
                <input id="username" type="text"  className="border-2"/>
                Password
                <input id="password" type="password" className="border-2"/>
                <input type="submit"/>
            </form> */}
        </div>
    </div>)
}
export default Signup