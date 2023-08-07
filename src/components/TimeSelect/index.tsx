import React from "react";
import style from "./index.module.css";
import icon_date from "../../assets/image/icon_date.png";

export default function TimeSelect() {
    return (
        <div className={style.select}>
            <img src={icon_date} alt="" />
            <div className={style.time}>2023-05-11 08:00</div>
        </div>
    );
}
