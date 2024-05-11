import { useState } from "react"
import { search } from "../utils/userUtils"

const UserSearch = () => {
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)
    const type = (searchValue) => {
        search(searchValue).then(rs => {
            setResults(rs)
        }).catch(e => console.log(e))
    }
    return (<>
        <input type="text" className="bg-gray-500" onChange={(e) => {
            if(e.target.value === "") {
                setSearched(false)
            }
            else {
                setSearched(true)
            }
            type(e.target.value)
        }}/>
        <div>
        { results && searched === true && results.map(result => {
            return <div className="text-black">
                {result.firstName}
                {result.lastName}
            </div>
        }) }
        </div>
    </>)
}

export default UserSearch