import Header from "./Header"
import Logout from "./Logout"

const Pending = () => {
    return (<div className="w-screen mt-20 lg:mt-0 font-subtitle lg:mt-0 mx-auto">
    <Header />
        <div className="flex justify-center text-3xl mx-5">
            <div className="flex flex-col items-center space-y-5">
            <div className="text-center">
            Your account is pending approval. Once you are approved, you will no longer see this screen.
            </div>
            <div className="w-fit">
            <Logout />
            </div>

            </div>
        </div>
    </div>)
}
export default Pending