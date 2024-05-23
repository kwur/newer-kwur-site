import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const PasswordReset = () => {
    const url = process.env.REACT_APP_BACKEND_URL

    const navigate = useNavigate()
    const onFormSubmit = (e) => {
        e.preventDefault()
        const URLsearcher = new URLSearchParams(window.location.search)
        const token = URLsearcher.get("token")
        const userID = URLsearcher.get("user")
        const newPassword = e.target.newPassword.value
        axios.post(url + "/users/resetPassword", { // this should be in userUtils.js but im lazy
            id: userID,
            token: token,
            newPassword: newPassword
        }).then(res => {
            alert("Success!")
            navigate("/login")
        }).catch(e => {
            alert("Something went wrong. Please try again.")
        })
    }
    return (<>
        <div className="font-mono w-screen mx-auto">
            <Header />
            <div className="border-0.5 border-gray-800 border-solid relative" > </div>

            <div className="flex justify-center mt-6 p-10 pb-4 font-mono">
                <div className="mb-4">
                    <form onSubmit={onFormSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg border-2 border-red-500">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Enter your new password
                        </label>
                        <input placeholder="New Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" type="password" name="newPassword" />
                        <input type="submit" value="Submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                    </form>
                </div>

            </div>

        </div>
    </>)
}

export default PasswordReset