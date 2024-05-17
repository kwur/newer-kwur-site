import Header from "./Header"

const Calendar = () => {
    return (<>
    <Header />
    <div className="flex w-full justify-center">
        <div className="flex flex-col items-center">
            <h1 className="font-header text-red-500 text-4xl">KWUR Calendar</h1>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&bgcolor=%23ffffff&showNav=1&showPrint=0&showTabs=0&showTitle=0&showCalendars=0&title=KWUR%20EVENTS&src=Y18yNWZjYTAxZWNhNWE1OGQyYjA2ZGEwYTM3ODZiNmEwYjYwMWNjMmYxZmJmYTY1NjNhZTc0ZThlNWJiY2VjYmMyQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23EF6C00" style={{borderWidth:0}} width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
    </div>
    </>)
}

export default Calendar