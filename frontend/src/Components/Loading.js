
const Loading = () => {
    return (<>
    <div className="flex mt-[20vh] flex-col justify-center w-screen h-100">
        <div className="flex justify-center w-100">
            <div className=" justify-center bg-logored p-10 w-10 h-5 animate-spin">
                            
            </div>
        </div>
        <div className="font-mono animate-pulse text-center p-3 align-middle">
            loading...
        </div>
    </div>
    </>)
}

export default Loading