import Header from "./Header"

const About = () => {
    return (<>
    <Header />
    <div className="flex justify-center pt-20 lg:pt-0">
        <div className="flex flex-col items-center">
            <h1 className="font-header text-7xl pb-10">About KWUR</h1>
            <div className="font-mono text-lg w-10/12">
                KWUR 90.3 FM is Washington University's student run radio station, broadcasting 24 hours a day upon the surrounding community. KWUR DJs spin a wide variety of musical programming and broadcast news, public information, and Washington University sporting events. Since its foundation in 1976, KWUR's goal has been to supply listeners with otherwise unavailable programming in St. Louis radio.
            </div>
        </div>
    </div>
    </>)
}

export default About