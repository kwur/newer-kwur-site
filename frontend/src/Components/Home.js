import { useNavigate } from "react-router"
import Header from "./Header" 

const Home = () => {
    const token = localStorage.getItem("token")
    const nav = useNavigate()
    return (
        <>
            <Header />
            <div className="flex justify-center">
                <div className="font-header text-6xl pt-10  w-fit justify-center">
                    KWUR 90.3 FM
                </div>
            </div>
        </>
    )
}
export default Home