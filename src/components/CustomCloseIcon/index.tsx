import React from "react";
import "./index.css";
import icon_close from "../../assets/image/icon_close.png";

export default function customCloseIcon() {
    return (
        <div className="close-icon-container">
            <div className="close-icon">
                <img src={icon_close} alt="" />
            </div>
        </div>
    );
}
