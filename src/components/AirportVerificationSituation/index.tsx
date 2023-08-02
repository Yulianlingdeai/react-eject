import React, { useState } from "react";
import "./index.css";
import icon_2mtem from "../../assets/image/icon_2m_tem.png";
import icon_10m_wind_direction from "../../assets/image/icon_10m_wind_direction.png";

export default function AirportVerificationSituation() {
    const [operate, setOperate] = useState(0);
    const btnList = [
        { id: 1, label: "2m气温", src: icon_2mtem },
        { id: 2, label: "10m风向", src: icon_10m_wind_direction },
        { id: 3, label: "10m风速" },
        { id: 4, label: "1h降水" },
        { id: 5, label: "3h降水" },
        { id: 6, label: "24h降水" },
        { id: 7, label: "能见度" },
        { id: 8, label: "低云云量" },
        { id: 9, label: "低云云底高" }
    ];
    return (
        <div className="airport-verification">
            <div className="airport-operater">
                {btnList.map((item) => (
                    <div
                        className={`airport-btn ${item.id === operate ? "airport-btn-active" : ""}`}
                        key={item.id}
                        onClick={() => setOperate(item.id)}
                    >
                        <img src={item.src} alt="icon" />
                    </div>
                ))}
            </div>
            <div className="airport-btn-desc">
                {btnList.map((item) => (
                    <div className="airport-desc-item" key={item.id}>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
