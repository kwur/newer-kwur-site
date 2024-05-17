import Header from "./Header"

const Listen = () => {
    return (<>
    <Header />
    <div className="uppercase font-header text-3xl flex flex-col w-screen">
        <div className="py-10 m-5 flex align-center">
            <div className="flex flex-col items-center w-full">
                <label>Music</label>
                <iframe src="https://mixlr.com/users/4072220/embed" width="80%" height="180px" frameborder="no" marginheight="0" marginwidth="0"></iframe>
            </div>
        </div>
        <div className="py-10 flex align-center">
            <div className="flex flex-col items-center w-full">
                <label>Sports</label>
                <iframe src="https://mixlr.com/users/5500750/embed" width="80%" height="180px" frameborder="no" marginheight="0" marginwidth="0"></iframe>
            </div>
        </div>
    </div>
    </>)
}

export default Listen