import { useNavigate } from "react-router"
import Header from "./Header" 

const Home = () => {
    const token = localStorage.getItem("token")
    const nav = useNavigate()
    if(token) {
        nav("/dashboard")
    }
    return (
        <>
            <Header />
            <div>
                KWUR 90.3 FM
            </div>
        </>
    )
}
export default Home