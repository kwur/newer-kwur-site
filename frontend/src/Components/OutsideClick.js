import { useEffect, useRef } from "react"

const OutsideClick = (cb) => {
    const screenRef = useRef()
    useEffect(() => {
        const handleClick = (e) => {
            if(screenRef.current && !screenRef.current.contains(e.target)) {
                cb()
            }
        }
        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [screenRef])
    return screenRef
}

export default OutsideClick