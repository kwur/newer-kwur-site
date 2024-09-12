import { useEffect, useState } from "react";
import { getAllShows } from "../utils/showUtils";
import Header from "./Header";
import Loading from "./Loading";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from 'react-tooltip';
import { getUserById } from "../utils/userUtils";
import 'react-tooltip/dist/react-tooltip.css'

const ShowSchedule = () => {
    const [shows, setShows] = useState();
    const [loading, setLoading] = useState(false);
    const [day, setDay] = useState("Sunday")
    const smallScreen = useMediaQuery({ query: '(max-width: 1024px)' })
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
        <div className="mx-auto w-screen">
            <Header />
            {loading === true ? (
                <Loading />
            ) : (
                <div className="flex-col w-dvw">
                    <div className="pt-20 lg:pt-0 flex-col items-center justify-center">
                        <div className="font-header text-3xl w-full lg:text-4xl text-center">
                            KWUR 90.3 FM SHOW SCHEDULE
                        </div>
                        <div className="lg:flex w-fit grid grid-cols-2 mx-auto justify-center">
                            {Object.keys(genresToColors).map((genre) => {
                                const color = genresToColors[genre]
                                    ? genresToColors[genre]
                                    : "pink";
                                return (
                                    <div className="flex  h-fit w-fit px-1 lg:px-5 align-middle">
                                        <div className="h-100 flex flex-col place-content-center">
                                            <div
                                                style={{ backgroundColor: color }}
                                                className=" w-2 h-2"
                                            ></div>
                                        </div>
                                        <div className="w-fit font-mono p-1 lg:p-2">{genre}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex pb-10 pt-5 lg:pt-0 justify-center">
                        <div className="ml-5 grid grid-cols-1">
                            <div className="text-right align-middle pb-20 lg:pb-0 grid">
                                <h1
                                    style={{ height: "2em" }}
                                    className="leading-[2em] uppercase font-header text-xl"
                                ></h1>
                                {
                                    timeSlots.map((hour) => {
                                        return (
                                            <div
                                                style={{ height: "2em" }}
                                                className="font-header leading-[2em] lg:w-20 uppercase"
                                            >
                                                {hour === -1 ? "" : hourToTime(hour)}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="px-9 grid pb-20 lg:pb-0 grid-cols-1 lg:grid-cols-7">
                            {shows &&
                                (smallScreen === true
                                    ?
                                    <>
                                        <select style={{ height: "2em" }}
                                                    className="leading-[2em] bg-red-500 text-white uppercase font-header text-xl" onChange={(e) => setDay(e.target.value)}>
                                            { daysOfWeek.map(day => <option className="font-header"
                                                    >{day}</option>) }
                                        </select>
                                        <div className="grid">
                                                {timeSlots.map((hour) => {
                                                    const showsAtThisHour = shows[day].filter(
                                                        (show) =>
                                                            show.showTime.startTime <= hour &&
                                                            show.showTime.endTime > hour
                                                    );
                                                    console.log("hello???", showsAtThisHour)
                                                    const showNow = showsAtThisHour[0];
                                                    // if there is no show at this time, return an empty cell
                                                    if (!showNow) {
                                                        return (
                                                            <div
                                                                style={{
                                                                    height: "2em",
                                                                    width: "14em",
                                                                    "border-style": "dashed",
                                                                    borderWidth: "0.5px",
                                                                    // borderColor: "black"
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
                                                                width: "14em",
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
                                    </>
                                    :
                                daysOfWeek.map((dayOfWeek) => {
                                    console.log(shows)
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
                                                                    width: "11em",
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
                                                    console.log(showNow)
                                                    return (
                                                        <div
                                                        style={{
                                                            height:
                                                                            (showNow.showTime.endTime -
                                                                                showNow.showTime.startTime) *
                                                                            2 +
                                                                            "em",
                                                                            width: "11em",
                                                                            backgroundColor: color, 
                                                                            borderStyle: "dashed",
                                                                            borderColor: "white",
                                                                            borderWidth: "0.75px",
                                                                            borderLeftWidth: "0px",
                                                                            borderRightWidth: "0px"
                                                                    }}
                                                                    className={`font-mono p-2 overflow-y-hidden break-all`}
                                                                    >
                                                                    {showNow && hour === showNow.showTime.startTime
                                                                        ? showNow.showName
                                                                        : ""}
                                                                    {/* <div className="text-xs"> */}
                                                                    {/* with {`${showNow.dj} ${showNow.coDJ ? "and " + showNow.coDJ.firstName : ""}`} */}
                                                                    {/* </div> */}
                                                                </div>
                                                    );
                                                })}
                                            </div>
                                        )
                                   }
                                }))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ShowSchedule;
