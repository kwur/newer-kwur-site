import { useEffect, useState } from "react";
import { getAllShows } from "../utils/showUtils";
import Header from "./Header";
import Loading from "./Loading";

const ShowSchedule = () => {
    const [shows, setShows] = useState({});
    const [loading, setLoading] = useState(false);
    const genresToColors = {
        eclectic: "rgb(59 130 246)",
        electronic: "rgb(34 197 94)",
        classical: "rgb(249 115 22)",
        "talk show": "rgb(250 204 21)",
        variety: "rgb(139 92 246)",
        other: "pink"
    };
    const daysOfWeek = [
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
                setLoading(false);
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <>
            <Header />
            {loading === true ? (
                <Loading />
            ) : (
                <div className="flex-col">
                    <div className="flex-col items-center justify-center">
                        <div className="font-header text-4xl text-center">
                            KWUR 90.3 FM SHOW SCHEDULE
                        </div>
                        <div className="flex justify-center">
                            {Object.keys(genresToColors).map((genre) => {
                                const color = genresToColors[genre]
                                    ? genresToColors[genre]
                                    : "pink";
                                return (
                                    <div className="flex h-fit px-5 align-middle">
                                        <div className="h-100 flex flex-col place-content-center">
                                            <div
                                                style={{ backgroundColor: color }}
                                                className=" w-2 h-2"
                                            ></div>
                                        </div>
                                        <div className="w-fit font-mono p-2">{genre}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex pb-10 align-center">
                        <div className="pr-5 mx-5 grid grid-cols-1 w-100">
                            <div className="text-right align-middle grid w-100">
                                <h1
                                    style={{ height: "2em" }}
                                    className="leading-[2em] uppercase font-header text-xl"
                                ></h1>
                                {timeSlots.map((hour) => {
                                    return (
                                        <div
                                            style={{ height: "2em" }}
                                            className="font-header w-20 uppercase"
                                        >
                                            {hour === -1 ? "" : hourToTime(hour)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="px-9 grid grid-cols-7">
                            {shows &&
                                daysOfWeek.map((dayOfWeek) => {
                                    const showsOnThisDay = shows[dayOfWeek];
                                    if (showsOnThisDay) {
                                        // one row of columns
                                        return (
                                            <div className="grid ">
                                                <h1
                                                    style={{ height: "2em" }}
                                                    className="leading-[2em] uppercase font-header text-xl"
                                                >
                                                    {dayOfWeek}
                                                </h1>
                                                {timeSlots.map((hour) => {
                                                    const showsAtThisHour = showsOnThisDay.filter(
                                                        (show) =>
                                                            show.showTime.startTime <= hour &&
                                                            show.showTime.endTime > hour
                                                    );
                                                    const showNow = showsAtThisHour[0];
                                                    // if there is no show at this time, return an empty cell
                                                    if (!showNow) {
                                                        return (
                                                            <div
                                                                style={{
                                                                    height: "2em",
                                                                    "border-style": "dashed",
                                                                    borderWidth: "0.5px",
                                                                    // backgroundColor: hour % 2 === 0 ? "white" : "lightgray"
                                                                }}
                                                                className={"border-red-300"}
                                                            ></div>
                                                        );
                                                    }
                                                    // if there is a show but it is not the beginning, return nothing so that the beginning hour can be a longer cell
                                                    if (showNow && hour !== showNow.showTime.startTime) {
                                                        return;
                                                    }
                                                    // return the beginning hour cell
                                                    const color = genresToColors[showNow.genre]
                                                        ? genresToColors[showNow.genre]
                                                        : "pink";
                                                    return (
                                                        <p
                                                            style={{
                                                                height:
                                                                    (showNow.showTime.endTime -
                                                                        showNow.showTime.startTime) *
                                                                    2 +
                                                                    "em",
                                                                backgroundColor: color,
                                                            }}
                                                            className={`font-mono p-2 overflow-y-hidden break-all`}
                                                        >
                                                            {showNow && hour === showNow.showTime.startTime
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
                </div>
            )}
        </>
    );
};
export default ShowSchedule;
