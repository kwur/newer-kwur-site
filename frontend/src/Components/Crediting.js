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
    return (<div className="border-2 border-red-700 p-5 rounded">
        <h1 className="font-header text-3xl">Crediting</h1>
        <div className="font-mono">
            users being changed: { usersToChange.map((user) => {
                return user.firstName + " " + user.lastName
            })
            }
        </div>
        <div className="font-mono text-red-500">
        Batch update? <input type="checkbox" onChange={(e) => setBatch(e.target.checked)}/>
        </div>
        <div className="font-mono">
            {batch === true ? "Enter a comma separated list:" : "Search for a user:"}
        </div>
        
        { batch === true 
            ? <input className="font-mono" type="text" onChange={(e) => setInputString(e.target.value)}/>
            : <UserSearch getSelected={(user) => setUsersToChange([...usersToChange, JSON.parse(user)])} />
        }

        <div className="font-mono">
        Credits to add
        </div>
        <input className="font-mono w-[5em] text-center" type='number' onChange={(e) => setCreditsToAdd(e.target.value)}/>
        <button className="bg-red-500 rounded p-2 text-white m-2 hover:bg-red-700 font-subtitle" onClick={addCreditsToEachUser}>add em</button>
    </div>)
}
export default Crediting