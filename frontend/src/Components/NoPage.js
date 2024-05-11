import { Link } from "react-router-dom"
import Header from "./Header"

const NoPage = () => {
    return (<>
    <div className="grid col-1 justify-center justify-items-center align-center">
        <div className="font-header text-6xl w-100 p-20 text-center">
            Oh no! This page doesn't exist.
        </div>
        <Link className="bg-red-500 font-subtitle text-white p-3 text-2xl w-fit rounded hover:bg-red-700" to="/">Go back home...</Link>
    </div>
    </>)
}

export default NoPage