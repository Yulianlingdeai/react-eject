import React from "react";
import "./index.css";
import icon_airport from "../../assets/image/icon_airport.png";
import icon_area from "../../assets/image/icon_area.png";

export default function VerificationBtnList({ type }: { type: number }) {
    return (
        <div className="verification-btn-box">
            <div className={`verification-btn ${type === 1 ? "active" : "inactive"}`}>
                <img className="icon-airport" src={icon_airport} alt="" />
            </div>
            <div className={`verification-btn ${type === 2 ? "active" : "inactive"}`}>
                <img className="icon-area" src={icon_area} alt="" />
            </div>
        </div>
    );
}
