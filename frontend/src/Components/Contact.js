import ExecBoard from "./ExecBoard"
import Header from "./Header"

const Contact = () => {
    return (<div className="mx-auto w-screen">
    <Header />
    <div className="flex justify-center pt-20 lg:pt-0 w-11/12 mx-auto">
        <div className="flex flex-col w-full items-center">
        <h1 className="font-header text-7xl pb-10 text-red-500">Contact Us!</h1>
            <div className="flex">
                <div className="grid grid-cols-1 grid-rows-4 mr-10 leading-tight font-mono">
                    <div className="text-3xl font-subtitle">
                        Mailing Address
                    </div>
                    <div>
                        KWUR 90.3 FM
                    </div>
                    <div>
                        Campus Box 1205
                    </div>
                    <div>
                        One Brookings Dr.
                    </div>
                    <div>
                        St. Louis, MO 63130
                    </div>

                </div>
                <div className="grid grid-cols-1 grid-rows-4 leading-tight font-mono">
                    <div className="text-3xl font-subtitle">
                        Phone Numbers
                    </div>
                    <div>
                        Office: (314) 935-5952
                    </div>
                    <div>
                        Request: (314) 935-KWUR
                    </div>
                    <div>
                        Fax: (314) 935-8833
                    </div>
                </div>
            </div>



            <h1 className="font-header text-6xl pt-10 ">Administrative Staff</h1>
            <ExecBoard />
        </div>
    </div>
    </div>)
}

export default Contact