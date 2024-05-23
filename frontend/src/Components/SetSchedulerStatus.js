const { useEffect, useState } = require("react")
const { checkIfSchedulerOpen, changeScheduler } = require("../utils/showUtils")

const SetSchedulerStatus = () => {
    const [isAlreadyOpen, setIsAlreadyOpen] = useState()
    const changeSchedulerStatus = () => {
        console.log("pooop", isAlreadyOpen)
        const statusToSet = isAlreadyOpen === true ? false: true // i hate javascript truthy values
        const oldStatus = isAlreadyOpen
        changeScheduler(oldStatus, statusToSet).then(result => {
            console.log(result)
            setIsAlreadyOpen(!isAlreadyOpen)
        })
    }
    useEffect(() => {
        if(!isAlreadyOpen) {
            checkIfSchedulerOpen().then(status => {
                console.log(status)
                setIsAlreadyOpen(status)
            }).catch(e => console.log(e))
        }
    })
    return (<div className={`border-2 m-5 p-5 border-dashed ${isAlreadyOpen === true ?  "border-green-400" : "border-red-400"}`}>
    <div className="font-subtitle text-3xl">
    scheduler is <span className={`${isAlreadyOpen === true ? "text-green-500" : "text-red-500"}`}>{isAlreadyOpen === true ? "open" : "closed"}</span>
    </div>
    <div>
        <button className="bg-gray-700 text-white hover:bg-gray-900 rounded p-2 font-mono" onClick={changeSchedulerStatus}>{isAlreadyOpen === true ? "close" : "open"} the scheduler</button>
    </div>
    </div>)
}
export default SetSchedulerStatus