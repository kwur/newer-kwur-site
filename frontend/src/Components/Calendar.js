import MediaQuery from "react-responsive"
import Header from "./Header"

const Calendar = () => {
    return (<div className="mx-auto w-screen">
    <Header />
    <div className="flex justify-center pt-20 lg:pt-0 w-11/12 mx-auto">
        <div className="flex flex-col w-full items-center">
            <h1 className="font-header text-red-500 text-4xl">KWUR Calendar</h1>
                <MediaQuery maxWidth={1023}>
                    <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&bgcolor=%23ffffff&showNav=1&showPrint=0&showTabs=0&mode=AGENDA&showTitle=0&showCalendars=0&title=KWUR%20EVENTS&src=Y18yNWZjYTAxZWNhNWE1OGQyYjA2ZGEwYTM3ODZiNmEwYjYwMWNjMmYxZmJmYTY1NjNhZTc0ZThlNWJiY2VjYmMyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23EF6C00" style={{borderWidth:0}} width="100%" height="600" frameborder="0" scrolling="no"></iframe>
                </MediaQuery>
                <MediaQuery minWidth={1024}>
                    <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&bgcolor=%23ffffff&showNav=1&showPrint=0&showTabs=0&showTitle=0&showCalendars=0&title=KWUR%20EVENTS&src=Y18yNWZjYTAxZWNhNWE1OGQyYjA2ZGEwYTM3ODZiNmEwYjYwMWNjMmYxZmJmYTY1NjNhZTc0ZThlNWJiY2VjYmMyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23EF6C00" style={{borderWidth:0}} width="800" height="600" frameborder="0" scrolling="no"></iframe>
                </MediaQuery>
        </div>
    </div>
    </div>)
}

export default Calendar