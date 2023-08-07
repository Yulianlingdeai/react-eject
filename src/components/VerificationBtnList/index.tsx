import React from "react";
import style from "./index.module.css";
import icon_airport from "../../assets/image/icon_airport.png";
import icon_area from "../../assets/image/icon_area.png";
type props = { type: number; handleChangeType: (key: number) => void };
export default function VerificationBtnList({ type, handleChangeType }: props) {
    return (
        <div className={style.container}>
            <div
                className={`${style.btn} ${type === 1 ? style.active : style.inactive}`}
                title="机场检验"
                onClick={() => handleChangeType(1)}
            >
                <img className={style.airport} src={icon_airport} alt="" />
            </div>
            <div
                className={`${style.btn} ${type === 2 ? style.active : style.inactive}`}
                title="区域检验"
                onClick={() => handleChangeType(2)}
            >
                <img className={style.area} src={icon_area} alt="" />
            </div>
        </div>
    );
}
