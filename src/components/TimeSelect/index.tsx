import React from "react";
import "./index.css";
import icon_date from "../../assets/image/icon_date.png";

export default function TimeSelect() {
    return (
        <div className="time-select">
            <img src={icon_date} alt="" />
            <div className="time">2023-05-11 08:00</div>
        </div>
    );
}
