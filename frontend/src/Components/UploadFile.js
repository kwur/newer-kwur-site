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
        <form className="border-2 rounded border-red-500 lg:w-fit w-screen m-2 p-2" onSubmit={handleFileUpload}>
        <h1 className="font-header text-3xl">Upload a file to KWUR.WUSTL.EDU</h1>
            <input id="file" className="font-subtitle" type="file" multiple={true} onChange={(e) => setFileList(e.target.files)} />
            <div className="font-mono">
                where do you want us to put it? (kwur.wustl.edu/[ENTER THIS PART])
                <div className="py-3 text-gray-600">
                    (note that any paths that are on the dj-side begin with "dj/")
                </div>
            </div>
            <input type="text" className="font-mono m-1" placeholder="enter path here" onChange={(e) => {
                var tempPath = e.target.value
                if(tempPath.substring(0, 1) !== "/") {
                    tempPath = "/" + tempPath
                }
                setPath(tempPath)
            }} />
            <input className="font-header bg-red-500 p-1 m-1 text-white rounded" type="submit" />
        </form>
    </>)
}
export default UploadFile