import axios from "axios"

/**
 * Attempts to make a show given time choices and show info, assumes information has been validated
 * @param choices an array of time choices where the format is:
 * {
 *  day: str,
 *  startTime: 24h (str),
 *  endTime: 24h (str)
 * }
 * @param showInfo 
 * @returns true if successful (created show with any one of the choices), false if all choices were taken, undefined if something went wrong
 */
export function tryToMakeShow(choices, showInfo) {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.post("http://localhost:3001/shows/attemptCreateNewShow", {
        choices: choices,
        showInfo: showInfo
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => {
        console.log(result)
        if(result.status === 201) {
            return true
        }
        else {
            return false
        }
    }).catch(e => {
        console.log(e)
        return undefined
    })
}