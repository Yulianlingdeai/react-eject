import React, { useState } from "react";
import "./index.css";
import icon_airport_setting from "../../assets/image/icon_airport_setting.png";
import icon_airport_verification_setting from "../../assets/image/icon_airport_verification_setting.png";

export default function VerificationSetting() {
    const [isShowAirportVeriSetting, SetIsShowAirportVeriSetting] = useState(false);
    const [isShowAirportSetting, SetIsShowAirportSetting] = useState(false);
    const handleShowAirportVeriSetting = () => {
        SetIsShowAirportVeriSetting(!isShowAirportVeriSetting);
    };
    const handleShowAirportSetting = () => {
        SetIsShowAirportSetting(!isShowAirportSetting);
    };
    return (
        <div className="verification-setting">
            <div
                className={`setting-item ${isShowAirportVeriSetting ? "active" : ""}`}
                onClick={handleShowAirportVeriSetting}
            >
                <img
                    className="icon-airport-verification-setting"
                    src={icon_airport_verification_setting}
                    alt=""
                />
            </div>
            <div
                className={`setting-item ${isShowAirportSetting ? "active" : ""}`}
                onClick={handleShowAirportSetting}
            >
                <img className="icon-airport-setting" src={icon_airport_setting} alt="" />
            </div>
        </div>
    );
}
