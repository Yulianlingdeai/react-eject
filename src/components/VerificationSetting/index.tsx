import React, { useState } from "react";
import "./index.css";
import AirportVerificationSettingDrawer from "../AirportVerificationSettingDrawer";
import AirportSetting from "../AirportSetting";
import icon_airport_setting from "../../assets/image/icon_airport_setting.png";
import icon_airport_verification_setting from "../../assets/image/icon_airport_verification_setting.png";

export default function VerificationSetting() {
    const [isShowAirportVeriSetting, setIsShowAirportVeriSetting] = useState(false);
    const [isShowAirportSetting, setIsShowAirportSetting] = useState(false);
    const handleShowAirportVeriSetting = () => {
        setIsShowAirportVeriSetting(!isShowAirportVeriSetting);
    };
    const handleCloseAirportVeriSetting = (isShow: boolean) => {
        setIsShowAirportVeriSetting(isShow);
    };
    const handleShowAirportSetting = () => {
        setIsShowAirportSetting(!isShowAirportSetting);
    };
    const handleCloseAirportSetting = (isShow: boolean) => {
        setIsShowAirportSetting(isShow);
    };
    return (
        <>
            <div className="verification-setting">
                <div
                    className={`setting-item ${isShowAirportVeriSetting ? "active" : ""}`}
                    onClick={handleShowAirportVeriSetting}
                >
                    <img className="icon-airport-verification-setting" src={icon_airport_verification_setting} alt="" />
                </div>
                <div
                    className={`setting-item ${isShowAirportSetting ? "active" : ""}`}
                    onClick={handleShowAirportSetting}
                >
                    <img className="icon-airport-setting" src={icon_airport_setting} alt="" />
                </div>
            </div>
            <AirportVerificationSettingDrawer
                open={isShowAirportVeriSetting}
                onClose={handleCloseAirportVeriSetting}
            ></AirportVerificationSettingDrawer>
            <AirportSetting open={isShowAirportSetting} onClose={handleCloseAirportSetting}></AirportSetting>
        </>
    );
}
