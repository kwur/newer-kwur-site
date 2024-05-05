import { Link } from "react-router-dom"
 
const Header = () => {
    const currentPage = window.location.pathname
    const isOnDJPage = currentPage.substring(0, 3) === "/dj" || currentPage === "/login"
    return (
        <>
            { isOnDJPage === true ? 
            <header className="space-x-12 text-3xl leading-10 font-subtitle align-middle pt-5 flex justify-center w-full">
                <Link className="pt-5" to="/"><span className="bg-logoblack hover:bg-logored hover:cursor-pointer bg-no-repeat p-7"></span></Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/dj/scheduler">Scheduler</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Show Schedule</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Else</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to= "/home">Back to KWUR</Link>
            </header>    
            :
            <header className="space-x-12 text-3xl leading-10 font-subtitle align-middle pt-5 flex justify-center w-full">
                <Link className="pt-5" to="/"><span className="bg-logoblack hover:bg-logored hover:cursor-pointer bg-no-repeat p-7"></span></Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">About</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Listen</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Calendar</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Resources</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Services</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Join</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Support</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Contact</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to= "/dj/dashboard">DJ Home</Link>
            </header>
            }
        </>
    )
}

export default Header 