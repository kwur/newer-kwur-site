import { useEffect, useState } from "react"
import { getFiles } from "../utils/fileUtils"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Loading from "./Loading";

const FileViewer = (props) => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const url = props.location || window.location.pathname
        getFiles(url).then(fs => {
            console.log(fs)
            setFiles(fs)
            setLoading(false)
        }).catch(e => console.log(e))
    }, [])
    return (<>
    {
        loading === true ?
        <Loading /> 
        :
        <div className="flex justify-center items-center w-full">
            {
                files.length > 0 &&
                props.carousel ? 
                <Carousel className="flex justify-center border-[20px] z-10 border-red-500 mt-10 w-[90%] md:w-[40%]" 
                    dynamicHeight={true} 
                    renderIndicator={() => {}} 
                    infiniteLoop={true} 
                    showThumbs={false}
                    autoPlay={true}
                    swipeable={true}
                    emulateTouch={true}
                    showStatus={false}
                >
                    {
                        files.map(file => {
                            if(file.fileType !== "PDF") {
                                return <div>
                                    <img src={file.sourceUrl}></img>
                                </div>
                            }
                        })
                    }
                </Carousel> 
                :
                files.map((file) => {
                    if(file.fileType === "PDF") {
                        return <embed key={file._id} src={file.sourceUrl} width= "500" height= "375" />
                    }
                    console.log(file.sourceUrl)
                    return <img src={file.sourceUrl}></img>
                })
            }
            {
                files.length === 0 && window.location.pathname === "/dj/resources" ? "No files uploaded." : ""
            }
        </div>
    }
    </>)
}
export default FileViewer