import { useState } from "react"
import Header from "./Header"
// import "../../public/rsreview.jpg"

const About = () => {
    const [showImage, setShowImage] = useState(false)
    return (<>
    <Header />
    <div className="flex justify-center pt-20 lg:pt-0">
        <div className="flex flex-col items-center">
            <h1 className="font-header text-7xl pb-10">About KWUR</h1>
            <div className="font-mono text-lg w-10/12">
                KWUR 90.3 FM is Washington University's student run radio station, broadcasting 24 hours a day upon the surrounding community. KWUR DJs spin a wide variety of musical programming and broadcast news, public information, and Washington University sporting events. Since its foundation in 1976, KWUR's goal has been to supply listeners with otherwise unavailable programming in St. Louis radio.
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 p-10 w-11/12 text-center lg:w-1/2 space-y-5 lg:space-y-0 lg:space-x-10">
                <div class="font-mono">
                    <a className="text-red-600 hover:text-red-700 hover:underline" href="http://www.studlife.com/archives/News/2003/09/29/KWURbestincity/" target="_blank">KWUR Best In City</a><br />
                    <em>Student Life</em>, 2003
                </div>
                <div class="font-mono">
                    <a className="text-red-600 hover:text-red-700 hover:underline" href="https://www.riverfronttimes.com/bestof/2003/award/best-radio-station-31233/" target="_blank">RFT Best Radio Station of 2003</a><br />
                    <em>Riverfront Times</em>, 2003
                </div>
                <div class="font-mono">
                    <div className="absolute top-80 left-0 lg:top-20 lg:left-20">
                        <div className="bg-review px-[80vw] py-[20vh] lg:px-[20vw] lg:py-[20vh] w-auto bg-norepeat bg-cover" style={{position: "absolute", top: "10px", left: "10px", visibility: showImage === true ? "visible" : "hidden"}}>
                        </div>
                        <div className="text-red-500 relative left-5 top-2 hover:cursor-pointer" 
                        style={{visibility: showImage === true ? "visible" : "hidden"}}
                        onClick={() => setShowImage(false)}>X</div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 hover:underline" onClick={()=>setShowImage(!showImage)}>KWUR Review</button><br />
                    <em>The Rolling Stone College Guide</em>, 2005 
                </div>
            </div>
        </div>
    </div>
    </>)
}

export default About