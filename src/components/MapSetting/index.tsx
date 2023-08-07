import React from "react";
import style from "./index.module.css";
import icon_map from "../../assets/image/icon_map.png";
import icon_scale_big from "../../assets/image/icon_scale_big.png";
import icon_scale_small from "../../assets/image/icon_scale_small.png";

export default function MapSetting() {
    return (
        <div className={style.setting}>
            <div className={style.settingItem}>
                <img className={style.normal} src={icon_map} alt="" />
            </div>
            <div className={style.settingItem}>
                <img className={style.big} src={icon_scale_big} alt="" />
            </div>
            <div className={style.settingItem}>
                <img className={style.small} src={icon_scale_small} alt="" />
            </div>
        </div>
    );
}
