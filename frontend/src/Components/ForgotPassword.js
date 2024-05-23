import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../utils/userUtils";
import Header from "./Header";

const ForgotPassword = () => {
    const url = process.env.REACT_APP_BACKEND_URL
    const navigate = useNavigate();

    const initiateReset = (e) => {
        e.preventDefault()
        const userEmail = e.target.email.value
        forgotPassword(userEmail).then(result => {
            alert("Please check your email for a reset link");
            navigate("/login")
        }).catch(e => console.log(e))
    }
    return (<>

        <div className="font-mono w-screen mx-auto">
            <Header />
            <div className="flex justify-center mt-6 p-10 pb-4 font-mono pt-10">
                <div className="mb-4">
                    <form onSubmit={initiateReset} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg border-2 border-red-500">
                        <label className="block text-red-800 text-xl font-subtitle mb-2" htmlFor="email">
                            Enter email to reset password
                        </label>
                        <input placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" type="text" name="email" />
                        <input type="submit" value="Submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
                    </form>
                </div>

            </div>
        </div>

        </>)
}

        export default ForgotPassword