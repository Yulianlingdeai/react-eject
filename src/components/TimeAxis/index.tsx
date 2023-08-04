import React from "react";
import "./index.css";
import icon_retreat from "../../assets/image/icon_retreat.png";
import icon_forward from "../../assets/image/icon_forward.png";
import icon_pause from "../../assets/image/icon_pause.png";

export default function TimeAxis() {
    const tickList = [
        { id: 1, time: "08:00", day: "05-11", big: true },
        { id: 2, big: false },
        { id: 3, big: false },
        { id: 4, big: false },
        { id: 5, time: "20:00", big: true },
        { id: 6, big: false },
        { id: 7, big: false },
        { id: 8, big: false },
        { id: 9, time: "08:00", day: "05-12", big: true },
        { id: 10, big: false },
        { id: 11, big: false },
        { id: 12, big: false },
        { id: 13, time: "20:00", big: true },
        { id: 99, big: false },
        { id: 98, big: false },
        { id: 97, big: false },
        { id: 14, time: "08:00", day: "05-13", big: true },
        { id: 15, big: false },
        { id: 16, big: false },
        { id: 17, big: false },
        { id: 18, time: "20:00", big: true },
        { id: 19, big: false },
        { id: 20, big: false },
        { id: 21, big: false },
        { id: 22, time: "08:00", day: "05-14", big: true },
        { id: 23, big: false },
        { id: 24, big: false },
        { id: 25, big: false },
        { id: 26, time: "20:00", big: true }
    ];
    return (
        <div className="time-axis">
            <div className="time-operate-btn">
                <img src={icon_retreat} alt="" />
            </div>
            <div className="time-operate-btn">
                <img src={icon_forward} alt="" />
            </div>
            <div className="time-operate-btn active">
                <img className="play-pause" src={icon_pause} alt="" />
            </div>
            <div className="time-line-container">
                <div className="time-line"></div>
                <div className="time-blueline"></div>
                <div className="time-tick-container">
                    {tickList.map((item) => (
                        <div className={item.big ? "tick-big" : "tick-small"} key={item.id}>
                            {item.time && <div className="tick-time">{item.time}</div>}
                            {item.day && <div className="tick-day">{item.day}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
