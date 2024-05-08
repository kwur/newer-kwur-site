import CreateShow from "./CreateShow"
import Header from "./Header"

const Scheduler = () => {
    return (
        <>
            <Header />
            <div className="w-screen flex justify-center">
                <CreateShow />
            </div>
        </>
    )
}
export default Scheduler