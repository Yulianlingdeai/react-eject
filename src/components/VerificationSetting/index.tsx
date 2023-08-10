import React, { useState } from "react";
import style from "./index.module.css";
import AirportVerificationSettingDrawer from "../AirportVerificationSettingDrawer";
import AirportSettingDrawer from "../AirportSettingDrawer";
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
            <div className={style.verificationSetting}>
                <div
                    className={`${style.settingItem} ${isShowAirportVeriSetting ? style.active : ""}`}
                    onClick={handleShowAirportVeriSetting}
                >
                    <img
                        className={style.iconAirportVerificationSetting}
                        src={icon_airport_verification_setting}
                        alt=""
                    />
                </div>
                <div
                    className={`${style.settingItem} ${isShowAirportSetting ? style.active : ""}`}
                    onClick={handleShowAirportSetting}
                >
                    <img className={style.iconAirportSetting} src={icon_airport_setting} alt="" />
                </div>
            </div>
            <AirportVerificationSettingDrawer
                open={isShowAirportVeriSetting}
                onClose={handleCloseAirportVeriSetting}
            ></AirportVerificationSettingDrawer>
            <AirportSettingDrawer
                open={isShowAirportSetting}
                onClose={handleCloseAirportSetting}
            ></AirportSettingDrawer>
        </>
    );
}
