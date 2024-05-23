import { useEffect } from "react"
import FileViewer from "./FileViewer"
import Header from "./Header"
import { getLoggedInUser } from "../utils/userUtils"
import { useNavigate } from "react-router-dom"


const Resources = () => {
    const navigate = useNavigate()
    useEffect(() => {
        getLoggedInUser().then(user => {
            if(user === 1) {
                navigate("/login")
            }
        })
    })
    return (<div className="w-screen mx-auto">
    <Header />
    <div className="font-subtitle text-center pt-20 lg:pt-0 text-4xl">
        files 4 u:
    </div>
    <FileViewer />
    </div>)
}

export default Resources