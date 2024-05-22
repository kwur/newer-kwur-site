import ExecBoard from "./ExecBoard"
import Header from "./Header"

const Contact = () => {
    return (<div className="mx-auto w-screen">
    <Header />
    <div className="flex justify-center pt-20 lg:pt-0 w-11/12 mx-auto">
        <div className="flex flex-col w-full items-center">
            <h1 className="font-header text-6xl">Administrative Staff</h1>
            <ExecBoard />
        </div>
    </div>
    </div>)
}

export default Contact