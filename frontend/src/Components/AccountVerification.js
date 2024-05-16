import { useEffect } from "react"
import { sendGMRequest } from "../utils/userUtils"

const AccountVerification = () => {
    useEffect(() => {
        sendGMRequest().then(result => {
        })
    })
    return (<>
        An email has been sent to gm@kwur.com; your account will have to be approved through the link provided in the email.
    </>)
}

export default AccountVerification