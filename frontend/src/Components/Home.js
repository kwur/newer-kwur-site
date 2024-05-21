// import { useNavigate } from "react-router"
import Header from "./Header" 
import FileViewer from "./FileViewer"

const Home = () => {
    // const token = localStorage.getItem("token")
    // const nav = useNavigate()
    return (
        <div className="h-screen bg-background">
            <Header />
            <div className="flex justify-center">
                <div className="flex-col w-fit">
                    <div className="font-header text-8xl leading-tight  text-center">
                        KWUR 90.3 FM
                    </div>
                    <div className="text-red-500 font-subtitle text-3xl text-center">
                        Student-run St. Louis Underground Radio
                    </div>
                    <FileViewer location="/carousel" carousel={true} />
                </div>
            </div>
        </div>
    )
}
export default Home