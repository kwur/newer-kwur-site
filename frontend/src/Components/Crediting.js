import { useState } from "react"
import UserSearch from "./UserSearch"
import { incrementUserCredits, search } from "../utils/userUtils"

const Crediting = () => {
    const [usersToChange, setUsersToChange] = useState([])
    const [inputString, setInputString] = useState("")
    const [creditsToAdd, setCreditsToAdd] = useState(0)
    const [batch, setBatch] = useState(false)
    const cleanInputStringIntoStateArray = async () => {
        var currentUser = ""
        const peopleWeCouldntFind = []
        const newUsersToChange = []
        var lastChar = ''
        for(var i = 0; i <= inputString.length; i++) { // wow i love CSE131 -CSE131 head TA
            const char = inputString.charAt(i)
            if(char === "," ||  i === inputString.length) {
                // then the current user is done, lets find 'em
                try {
                    const results = await search(currentUser)
                    // assuming for simplicity that this is only the user we want
                    const userObject = results[0]
                    if(!userObject) {
                        peopleWeCouldntFind.push(currentUser)
                    }
                    else {
                        newUsersToChange.push(userObject)
                    }
                    currentUser = ""
                }
                catch(e) {
                    console.log(e)
                    peopleWeCouldntFind.push(currentUser)
                    currentUser = ""
                }
            }
            else if(lastChar !== ',' || (lastChar === ',' && char !== " ")) {
                currentUser += char
            }
            lastChar = char
        }
        return {users: newUsersToChange, failures: peopleWeCouldntFind }
    }
    const addCreditsToEachUser = async () => {
        var u = usersToChange
        if(batch === true) {
            const cleaned = await cleanInputStringIntoStateArray()
            if(cleaned.failures.length !== 0) {
                alert("Some entries could not be located in the user database: " + cleaned.failures.toString())
            }
            u = cleaned.users

        }
        const usersThatWereUpdated = []
        var usersThatWerentDone = []
        for(var index in u) { 
            const user = u[index]
            incrementUserCredits(user._id, creditsToAdd).then(status => {
                if(status === true) {
                    usersThatWereUpdated.push(user)
                }
                else {
                    const usersThatWerentDone = u.filter((user) => usersThatWereUpdated.includes(user) === false)
                    alert("Something went wrong. The following users WERE NOT updated: " + usersThatWerentDone.toString())
                }
            }).catch(e => {
                usersThatWerentDone = u.filter((user) => usersThatWereUpdated.includes(user) === false)
                alert("Something went wrong. The following users WERE NOT updated: " + usersThatWerentDone.toString())
                console.log(e)
            })
        }
        if(usersThatWerentDone.length === 0) {
            alert("Success.")
        }
        else {
            alert("The following users were not successfully updated: " + usersThatWerentDone.toString())
        }
    }
    return (<>
        <div>
            users being changed: { usersToChange.map((user) => {
                return user.firstName + " " + user.lastName
            })
            }
        </div>
        Search for a user:
        Batch update? (Entering a comma separated list) <input type="checkbox" onChange={(e) => setBatch(e.target.checked)}/>
        { batch === true 
            ? <input type="text" onChange={(e) => setInputString(e.target.value)}/>
            : <UserSearch getSelected={(user) => setUsersToChange([...usersToChange, JSON.parse(user)])} />
        }

        Credits to add
        <input type='number' onChange={(e) => setCreditsToAdd(e.target.value)}/>
        <button onClick={addCreditsToEachUser}>add em</button>
    </>)
}
export default Crediting