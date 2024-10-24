import MediaQuery from "react-responsive"
import Header from "./Header"

const Calendar = () => {
    return (<div className="mx-auto w-screen">
    <Header />
    <div className="flex justify-center pt-20 lg:pt-0 w-11/12 mx-auto">
        <div className="flex flex-col w-full items-center">
            <h1 className="font-header text-red-500 text-4xl">KWUR Calendar</h1>
                <MediaQuery maxWidth={1023}>
                <iframe src="https://calendar.google.com/calendar/embed?src=c_25fca01eca5a58d2b06da0a3786b6a0b601cc2f1fbfa6563ae74e8e5bbcecbc2%40group.calendar.google.com&ctz=America%2FChicago" style={{"border": 0}} width="800" height="600" frameborder="0" scrolling="no"></iframe>                </MediaQuery>
                <MediaQuery minWidth={1024}>
                <iframe src="https://calendar.google.com/calendar/embed?src=c_25fca01eca5a58d2b06da0a3786b6a0b601cc2f1fbfa6563ae74e8e5bbcecbc2%40group.calendar.google.com&ctz=America%2FChicago" style={{"border": 0}} width="800" height="600" frameborder="0" scrolling="no"></iframe>                </MediaQuery>
        </div>
    </div>
    </div>)
}

export default Calendar