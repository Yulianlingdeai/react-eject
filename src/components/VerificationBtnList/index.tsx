import React from "react";
import "./index.css";
import icon_airport from "../../assets/image/icon_airport.png";
import icon_area from "../../assets/image/icon_area.png";
type props = { type: number; handleChangeType: (key: number) => void };
export default function VerificationBtnList({ type, handleChangeType }: props) {
    return (
        <div className="verification-btn-box">
            <div
                className={`verification-btn ${type === 1 ? "active" : "inactive"}`}
                title="机场检验"
                onClick={() => handleChangeType(1)}
            >
                <img className="icon-airport" src={icon_airport} alt="" />
            </div>
            <div
                className={`verification-btn ${type === 2 ? "active" : "inactive"}`}
                title="区域检验"
                onClick={() => handleChangeType(2)}
            >
                <img className="icon-area" src={icon_area} alt="" />
            </div>
        </div>
    );
}
