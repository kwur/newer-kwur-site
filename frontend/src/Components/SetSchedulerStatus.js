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
    return (<>
    scheduler is {isAlreadyOpen === true ? "open" : "closed"}
    <div>
        <button onClick={changeSchedulerStatus}>{isAlreadyOpen === true ? "close" : "open"} the scheduler</button>
    </div>
    </>)
}
export default SetSchedulerStatus