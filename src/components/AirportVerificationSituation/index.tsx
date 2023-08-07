import React, { useState } from "react";
import style from "./index.module.css";
import icon_2mtem from "../../assets/image/icon_2m_tem.png";
import icon_10m_wind_direction from "../../assets/image/icon_10m_wind_direction.png";
import icon_10m_wend_speed from "../../assets/image/icon_10m_wend_speed.png";
import icon_rain from "../../assets/image/icon_rain.png";
import icon_visibility from "../../assets/image/icon_visibility.png";
import icon_low_cloud_cover from "../../assets/image/icon_low_cloud_cover.png";
import icon_low_clouds_high from "../../assets/image/icon_low_clouds_high.png";

export default function AirportVerificationSituation() {
    const [operate, setOperate] = useState(0);
    const btnList = [
        { id: 1, label: "2m气温", src: icon_2mtem, style: { width: "22px", height: "32px" } },
        { id: 2, label: "10m风向", src: icon_10m_wind_direction, style: { width: "28px", height: "28px" } },
        { id: 3, label: "10m风速", src: icon_10m_wend_speed, style: { width: "28px", height: "22px" } },
        { id: 4, type: 1, label: "1h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
        { id: 5, type: 3, label: "3h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
        { id: 6, type: 24, label: "24h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
        { id: 7, label: "能见度", src: icon_visibility, style: { width: "26.6px", height: "22px" } },
        { id: 8, label: "低云云量", src: icon_low_cloud_cover, style: { width: "28.6px", height: "22px" } },
        { id: 9, label: "低云云底高", src: icon_low_clouds_high, style: { width: "26px", height: "26px" } }
    ];
    return (
        <div className={style.airportVerification}>
            <div className={style.airportOperater}>
                {btnList.map((item) => (
                    <div
                        className={`${style.airportBtn} ${item.id === operate ? style.active : ""}`}
                        key={item.id}
                        onClick={() => setOperate(item.id)}
                    >
                        <img style={item.style} src={item.src} alt="icon" />
                        {item.type && <span className={style.num}>{item.type}</span>}
                    </div>
                ))}
            </div>
            <div className={style.desc}>
                {btnList.map((item) => (
                    <div className={style.descItem} key={item.id}>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
