import axios from "axios"

const url = process.env.REACT_APP_BACKEND_URL + "/files"

export function uploadFile(file, filename, path) {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    const formData = new FormData()
    formData.append("file", file)
    formData.append("path", path)
    return axios.post(url + "/fileUpload", formData, {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
        }
    }).then(result => {
        return result.data.url
    }).catch(e => {
        console.log(e)
    })
}

export function getFiles(path) {
    return axios.post(url + "/getFileForPath", {
        path: path
    }).then(result => {
        return result.data.files
    }).catch(e => console.log(e))
}