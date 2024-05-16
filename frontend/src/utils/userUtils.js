import axios from "axios"
const url = "http://localhost:3001"
/**
 * Attempt to log user in based off of given information. If success
 * @param  username 
 * @param  password 
 * @returns true if successful, false otherwise
 */
export function login(username, password) {
    // const token = localStorage.getItem("token")
    // if(token ) {
    //     return Promise.resolve(true)
    // }
    return axios.post(url + "/users/login", {
        email: username,
        password: password
    }).then(result => {
        // if(result.data.)
        console.log(result)
        if(result.status === 200) {
            const newToken = result.data.token
            localStorage.setItem("token", newToken)
            return result
        }
        return false
    }).catch(e => {
        console.log(e)
        return e.response.data
    })
}

/**
 * Attempts to create a user with the given credentials
 * @param first 
 * @param last 
 * @param username 
 * @param password 
 * @returns true if successful, "error" if the user is already existing, false otherwise
 */
export function signup(first, last, username, password) {
    return axios.post(url + "/users/signup", {
        firstName: first,
        lastName: last,
        email: username,
        password: password
    }).then(result => {
        const newToken = result.data.token
        localStorage.setItem("token", newToken)
        return true
    }).catch(e => {
        console.log(e)
        if(e.response.data?.error === "user already exists") {
            return "exists"
        }
        return false
    })
}
/**
 * Get the user based off of the stored token
 * @returns user if successful, null otherwise
 */
export function getLoggedInUser() {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.get(url + "/users/profile", {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => {
        const user = result.data.user
        if(user) {
            return user
        }
        return null
    }).catch(e => {
        console.log("Error in getting logged in user:", e)
        return null
    })
}

export function getUserById(id) {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.post(url + "/users/findUser", {
        id: id
    }, { 
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => {
        return result.data.user
    }).catch(e => console.log(e))
}

export function search(search) {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.post(url + "/users/userSearch", {search: search}, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => {
        return result.data.searchResults
    }).catch(e => console.log(e))
}

export function checkForUserToken(userId) {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.post(url + "/users/checkForToken", {user: userId}, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => {
        return result.data.exists
    }).catch(e => console.log(e))
}

export function sendGMRequest(){ 
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    return axios.post(url + "/users/promoteToGM", {search: search}, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => {
        console.log(result)
    }).catch(e => console.log(e))
}

export function approveOrDenyGMRequest(approve, userToken, userId) {
    const token = localStorage.getItem("token")
    if(!token) {
        return Promise.resolve(1)
    }
    console.log(userId)
    return axios.post(url + "/users/approveOrDenyGMRequest", {
        approve: approve,
        token: userToken,
        id: userId
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then(result => {
        return result.status === 200
    }).catch(e => console.log(e))
}