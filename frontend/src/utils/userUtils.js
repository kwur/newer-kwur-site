import axios from "axios"
const url = "http://localhost:3001"
/**
 * Attempt to log user in based off of given information. If success
 * @param  username 
 * @param  password 
 * @returns true if successful, false otherwise
 */
export function login(username, password) {
    const token = localStorage.getItem("token")
    if(!token) { 
        return false
    }
    return axios.post(url + "/users/login", {
        email: username,
        password: password
    }).then(result => {
        // if(result.data.)
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
export function signup(first, last, username, password) {
    const token = localStorage.getItem("token")
    if(!token) {
        return false
    }
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