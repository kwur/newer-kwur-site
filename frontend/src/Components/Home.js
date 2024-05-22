// import { useNavigate } from "react-router"
import Header from "./Header" 
import FileViewer from "./FileViewer"
const Home = () => {
    return (
        <div className="mx-auto w-11/12">
            <Header />
            <div className="flex justify-center p-4">
                <div className="flex-col w-full">
                    <div className="font-header pt-20 lg:pt-0 text-6xl w-full lg:text-8xl leading-tight text-center">
                        KWUR 90.3 FM
                    </div>
                    <div className="text-red-500 font-subtitle text-3xl text-center">
                        Student-run St. Louis Underground Radio
                    </div>
                    <img src="/wave_1.gif" className="absolute z-0 w-[110vw] h-1/2 left-0">

                    </img>
                    <FileViewer className="z-10" location="/carousel" carousel={true} />
                </div>
            </div>
        </div>
    )
}
export default Home