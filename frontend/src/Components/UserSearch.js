import { useState } from "react"
import { search } from "../utils/userUtils"

const UserSearch = (props) => {
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)
    const [value, setValue] = useState("")
    const [clicked, setClicked] = useState()
    const type = (searchValue) => {
        search(searchValue).then(rs => {
            setResults(rs)
        }).catch(e => console.log(e))
    }
    return (<>
        <input type="text" className="border-2" onChange={(e) => {
            setValue(e.target.value)
            setClicked(undefined)
            if(e.target.value === "") {
                setSearched(false)
            }
            else {
                setSearched(true)
            }
            type(e.target.value)
        }} 
        value= {
            clicked ? clicked.firstName + " " + clicked.lastName : value
        }/>
        
        <div>
        { results && searched === true && results.map(result => {
            return <div id={JSON.stringify(result)} onClick={(e) => {
                props.getSelected(e.target.id)
                setClicked(result)
                setResults()
            }}
            className="text-black font-mono text-lg hover:font-bold hover:cursor-pointer" >
                {result.firstName + " " + result.lastName}
            </div>
        }) }
        </div>
    </>)
}

export default UserSearch