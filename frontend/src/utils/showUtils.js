import axios from "axios"

const url = process.env.REACT_APP_BACKEND_URL + "/shows"

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
    return axios.post(url + "/attemptCreateNewShow", {
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

export function findShowForUser() {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.get(url + "/findShowForUser", {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => {
        if(result.data.pending) {
            return 2
        }
        return result.data.show
    })

}

export function removeShowForUser() {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.delete(url + "/deleteShow", {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(_ => true).catch(e => {
        console.log(e)
        return false
    })
}
export function getAllShows() {
    return axios.get(url + "/allShows", {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => {
        return result.data.shows
    }).catch(e => {
        console.log(e)
    })
}
export function checkIfSchedulerOpen() {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.get(url + "/schedulerStatus", {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(status => {
        // console.log(status)
        return status.data.status
    }).catch(e => {
        console.log(e)
    })
}

export function changeScheduler(oldStatus, newStatus) {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.post(url + "/openScheduling", {
        close: oldStatus,
        open: newStatus
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => result.status === 200).catch(e => {
        console.log(e)
    })
}