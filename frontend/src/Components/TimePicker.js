import { useEffect, useState } from "react"
import OutsideClick from "./OutsideClick"


const TimePicker = (props) => {
    const [hourClicked, setHourClicked] = useState(false)
    const [hour, setHour] = useState("")
    const [AMPM, setAMPM] = useState("")
    const outsideClickRef = OutsideClick(() => {
        setHourClicked(false)
    })
    useEffect(() => {
        if(props.getAMPM) {
            props.getAMPM(AMPM)
        } 
        if(props.getHour) {
            props.getHour(hour)
        } 
    }, [])
    return (<>
    {/* hour */}
    <input  
        ref={outsideClickRef}
        type="text"
        placeholder={"00"} 
        tabIndex={0}
        style={{caretColor: "transparent", width: "46px"}}
        onAuxClick={() => setHourClicked(!hourClicked)}
        onClick={() => setHourClicked(!hourClicked)}
        onChange={(e) => {
            var entered = e.target.value
            if(parseInt(entered) < 12) {
                entered = "0" + entered
            } 
            while(entered.length > 2) {
                entered = entered.substring(1)
            }
            if(parseInt(entered) <= 12) {
                setHour(entered)
                props.getHour(entered)
                props.getAMPM(AMPM)
            } else {
                // entered = "00"
                // setHour("00")
                // props.getHour(entered)
            }
        }}
    
        value={hour}
        className={`font-mono text-black focus:bg-blue-700 focus:text-white ${hourClicked ? "bg-blue-700 text-white" : "bg-white text-black"} h-fit text-md hover:cursor-pointer`}
    />
    <input  
        ref={outsideClickRef}
        type="text"
        placeholder="AM"
        tabIndex={0}
        style={{caretColor: "transparent", width: "40px"}}
        onChange={(e) => {
            console.log(e.target.value)
            const val = e.target.value.length === 1 ? e.target.value.toUpperCase() : e.target.value.substring(2).toUpperCase()
            console.log(val)
            if(val === "P" || val === "PM") {
                setAMPM("PM")
                props.getAMPM("PM")

            }
            else if(val === "A" || val === "AM"){
                setAMPM("AM")
                props.getAMPM("AM")

            }
        }}
        value={AMPM}
        className={`font-mono text-black focus:bg-blue-700 focus:text-white ${hourClicked ? "bg-blue-700 text-white" : "bg-white text-black"} h-fit text-md hover:cursor-pointer`}
    />
    </>)
}

export default TimePicker