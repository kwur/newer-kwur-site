import { useState } from "react"
import { uploadFile } from "../utils/fileUtils"

const UploadFile = () => {
    const [fileList, setFileList] = useState()
    const [path, setPath] = useState("")

    const handleFileUpload = (e) => {
        e.preventDefault()
        if(!fileList[0]) {
            alert("Please select a file before continuing.")
            return;
        }
        var failures = 0
        for(var i in fileList) {
            const file = fileList[i]
            if(typeof(file) === "object") { // because for some reason js will throw in the length of the array
                uploadFile(file, file.name, path).then(result => {
                    console.log(result)
                }).catch(e => {
                    failures += 1
                    console.log(e)
                })
            }
        }
        if(failures === 0) {
            alert("We did it joe")
        }
        else {
            alert("Some or all of the files were not uploaded.")
        }
    }
    return (<>
        <form onSubmit={handleFileUpload}>
            upload file:
            <input id="file" type="file" multiple={true} onChange={(e) => setFileList(e.target.files)} />
            where should it go (kwur.wustl.edu/[ENTER THIS PART])
            <input type="text" onChange={(e) => {
                var tempPath = e.target.value
                if(tempPath.substring(0, 1) !== "/") {
                    tempPath = "/" + tempPath
                }
                setPath(tempPath)
            }} />
            <input type="submit" />
        </form>
    </>)
}
export default UploadFile