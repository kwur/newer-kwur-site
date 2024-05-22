import { Link } from "react-router-dom"
import Logout from "./Logout"
import MediaQuery from "react-responsive"
import { stack as Menu } from 'react-burger-menu'
 
const Header = () => {
    const currentPage = window.location.pathname
    const isOnDJPage = currentPage.substring(0, 3) === "/dj" || currentPage === "/login"
    return (
        <>
            <MediaQuery maxWidth={1024}>
                {/* <Link className="pt-5" to="/"><span className="bg-logoblack hover:bg-logored hover:cursor-pointer bg-no-repeat p-7"></span></Link> */}
                <Menu styles={
                   {
                    bmBurgerButton: {
                        position: 'absolute',
                        width: '36px',
                        height: '30px',
                        left: '36px',
                        top: '36px'
                      },
                      bmBurgerBars: {
                        background: 'rgb(239 68 68)'
                      },
                      bmCrossButton: {
                        height: '24px',
                        width: '24px'
                      },
                      bmCross: {
                        background: 'rgb(239 68 68)'
                      },
                      bmMenuWrap: {
                        position: 'fixed',
                        height: '100%',
                        left: "0",
                      },
                      bmMenu: {
                        // background: 'rgb(239 68 68)',
                        padding: '1.5em 0.5em 1.5em 0.5em',
                        fontSize: '1.15em'
                      },
                      bmMorphShape: {
                        fill: 'rgb(239 68 68)'
                      },
                      bmItemList: {
                        color: '#b8b7ad',
                        padding: '0.5em',
                        display: "flex",
                        flexDirection: "column",
                        fontFamily: "Subtitle",
                        fontSize: "5vh"
                      },
                      bmItem: {
                        display: 'inline-block'
                      },
                   }
                }>
                { isOnDJPage === true ? 
                    <>
                        <Link className={`${currentPage === "/dj/scheduler" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/dj/scheduler">Scheduler</Link>
                        <Link className={`${currentPage === "/dj/showSchedule" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/dj/showSchedule">Show Schedule</Link>
                        <Link className={`${currentPage === "/dj/exec" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/dj/exec">Exec</Link>
                        <Link className={`${currentPage === "/dj/resources" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/dj/resources">Resources</Link>
                        <Link className={`menu-item align-baseline h-fit px-2`} to= "/home">Back to KWUR</Link>
                        <Logout />
                    </> 
                    :
                        <>
                            <Link className={`${currentPage === "/" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline  h-fit px-2`} to="/">Home</Link>
                            <Link className={`${currentPage === "/about" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/about">About</Link>
                            <Link className={`${currentPage === "/listen" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/listen">Listen</Link>
                            <Link className={`${currentPage === "/calendar" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/calendar">Calendar</Link>
                            <Link className={`${currentPage === "/showSchedule" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/showSchedule">Show Schedule</Link>
                            {/* <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/services">Services</Link> */}
                            <Link className={`${currentPage === "/join" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/join">Join</Link>
                            <Link className={`${currentPage === "/support" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/support">Support</Link>
                            <Link className={`${currentPage === "/contact" ? "rounded bg-red-700 text-white" : ""} menu-item align-baseline h-fit px-2`} to="/contact">Contact</Link>
                            <Link className={`menu-item align-baseline h-fit px-2`} to= "/dj/dashboard">DJ Home</Link>
                        </>
                }
                </Menu>
            </MediaQuery> 
            <MediaQuery minWidth={1024}>
                { isOnDJPage === true ? 
                <header className="space-x-12 text-3xl leading-10 font-subtitle align-middle pt-5 flex justify-center w-full">
                    <Link className="pt-5" to="/"><span className="bg-logoblack hover:bg-logored hover:cursor-pointer bg-no-repeat p-7"></span></Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/dj/scheduler">Scheduler</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/dj/showSchedule">Show Schedule</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/dj/exec">Exec</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/dj/resources">Resources</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to= "/home">Back to KWUR</Link>
                    <Logout />
                </header>    
                :
                <header className="space-x-12 text-3xl leading-10 font-subtitle align-middle pt-5 flex justify-center w-full">
                    <Link className="pt-5" to="/"><span className="bg-logoblack hover:bg-logored hover:cursor-pointer bg-no-repeat p-7"></span></Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/about">About</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/listen">Listen</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/calendar">Calendar</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/showSchedule">Show Schedule</Link>
                    {/* <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/services">Services</Link> */}
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/join">Join</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/support">Support</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to="/contact">Contact</Link>
                    <Link className="align-baseline hover:text-white hover:font-bold hover:bg-red-500 hover:rounded h-fit px-2" to= "/dj/dashboard">DJ Home</Link>
                </header>
                }
            </MediaQuery>
        </>
    )
}

export default Header 