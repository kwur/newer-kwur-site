import ExecBoard from "./ExecBoard"
import Header from "./Header"

const Contact = () => {
    return (<div className="mx-auto w-screen">
    <Header />
    <div className="flex justify-center pt-20 lg:pt-0 w-11/12 mx-auto">
        <div className="flex flex-col w-full items-center">
        <h1 className="font-header text-7xl pb-5 text-red-500">Contact Us!</h1>
            <div className="flex-col text-center lg:flex lg:flex-row space-y-10 lg:space-y-0">
                <div className="flex flex-col my-auto">
                    <div className="text-3xl font-subtitle">
                        Mailing Address
                    </div>
                    <div className="grid grid-cols-1 grid-rows-4 mr-10 font-mono">
                        <div className="h-fit">
                            KWUR 90.3 FM
                        </div>
                        <div className="h-fit">
                            Campus Box 1205
                        </div>
                        <div className="h-fit">
                            One Brookings Dr.
                        </div>
                        <div className="h-fit">
                            St. Louis, MO 63130
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-3xl font-subtitle">
                        Phone Numbers
                    </div>
                    <div className="grid grid-cols-1 grid-rows-4 mr-10 font-mono">
                        <div className="h-fit">
                            Office: (314) 935-5952
                        </div>
                        <div className="h-fit">
                        Request: (314) 935-KWUR
                        </div>
                        <div className="h-fit">
                        Fax: (314) 935-8833
                        </div>
                        <div className="h-fit">
                        Fax: (314) 935-8833
                        </div>
                    </div>
                </div>
            </div>



            <h1 className="font-header text-6xl pt-5 text-center">Administrative Staff</h1>
            <ExecBoard />
        </div>
    </div>
    </div>)
}

export default Contact