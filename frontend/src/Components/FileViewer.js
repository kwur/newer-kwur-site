import { useEffect, useState } from "react"
import { getFiles } from "../utils/fileUtils"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const FileViewer = (props) => {
    const [files, setFiles] = useState([])
    useEffect(() => {
        const url = props.location || window.location.pathname
        getFiles(url).then(fs => {
            console.log(fs)
            setFiles(fs)
        }).catch(e => console.log(e))
    }, [])
    return (<>
    {
        files.length > 0 &&
        props.carousel ? 
        <Carousel width="20%" dynamicHeight={true} renderIndicator={() => {}} infiniteLoop={true} showThumbs={false}>
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
                return <embed src={file.sourceUrl} width= "500" height= "375" />
            }
            console.log(file.sourceUrl)
            return <img src={file.sourceUrl}></img>
        })
    }
    </>)
}
export default FileViewer