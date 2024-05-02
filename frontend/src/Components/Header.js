import { Link } from "react-router-dom"
 
const Header = () => {
    return (
        <>
            <header className="space-x-12 text-xl leading-10 font-header align-middle pt-2 flex justify-center w-full">
                <Link className="pt-5" to="/"><span className="bg-logoblack hover:bg-logored hover:cursor-pointer bg-no-repeat p-7"></span></Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/listen">About</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/listen">Listen</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/listen">Calendar</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/listen">Resources</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/listen">Services</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/listen">Join</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/listen">Support</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/listen">Contact</Link>
                <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 h-fit px-2" to="/dashboard">DJ Home</Link>
            </header>
        </>
    )
}

export default Header 