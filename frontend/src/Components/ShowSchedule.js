import { useEffect, useState } from "react";
import { getAllShows } from "../utils/showUtils";
import Header from "./Header";

const ShowSchedule = () => {
    const [shows, setShows] = useState({});
    const daysOfWeek = [
        "time col",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const timeSlots = [...Array(24).keys()]; // silly goofy way to create an array with values from 0 to 24
    const hourToTime = (hour) => {
        if (hour === 0) {
            return "12:00 AM";
        }
        if (hour === 12) {
            return "12:00 PM";
        }
        if (hour < 12) {
            return hour + ":00 AM";
        } else {
            return hour - 12 + ":00 PM";
        }
    };
    useEffect(() => {
        getAllShows()
            .then((newShows) => {
                setShows(newShows);
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <>
            <Header />
            <div className="flex">
                <div className="pr-5 mx-5 grid grid-cols-1 w-100">
                    <div className="text-right align-middle grid w-100">
                    <h1 style={{height: "2em"}} className="leading-[2em] uppercase font-header text-xl"></h1>
                        { timeSlots.map((hour) => {
                            return <div style={{height: "2em"}}  className="font-header w-20 uppercase">{hour === -1 ? "" : hourToTime(hour)}</div>;
                        })}
                    </div>
                </div>
                <div className="px-9 grid grid-cols-8">
                    {shows &&
                        daysOfWeek.map((dayOfWeek) => {
                            const showsOnThisDay = shows[dayOfWeek];
                            if (showsOnThisDay) {
                                // one row of columns
                                return (
                                    <div className="grid">
                                        <h1 style={{height: "2em"}} className="leading-[2em] uppercase font-header text-xl">{dayOfWeek}</h1>
                                        {timeSlots.map((hour) => {
                                            const showsAtThisHour = showsOnThisDay.filter(
                                                (show) =>
                                                    show.showTime.startTime <= hour &&
                                                    show.showTime.endTime > hour
                                            );
                                            const showNow = showsAtThisHour[0]
                                            if(!showNow) {
                                                return <div style={{height: "2em", "border-style": "solid", "border-width": "0.5px"}} className={"border-red-700"}>
                                                </div>
                                            }
                                            if(showNow && hour !== showNow.showTime.startTime) {
                                                return
                                            }
                                            return (
                                                <p
                                                style={{height:(showNow.showTime.endTime - showNow.showTime.startTime) * 2 + "em"}} className="bg-red-500 font-mono p-2 overflow-y-hidden break-all"
                                                >
                                                    {showNow &&
                                                        hour === showNow.showTime.startTime
                                                        ? showNow.showName
                                                        : ""}
                                                </p>
                                            );
                                        })}
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
        </>
    );
};
export default ShowSchedule;
