import Header from "./Header"
import Logout from "./Logout"

const Pending = () => {
    return (<div className="w-screen mx-auto">
    <Header />
        Your account is pending approval. Once you are approved, you will no longer see this screen.
        <Logout />
    </div>)
}
export default Pending