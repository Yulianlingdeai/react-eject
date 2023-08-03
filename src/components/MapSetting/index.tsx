import React from "react";
import "./index.css";
import icon_map from "../../assets/image/icon_map.png";
import icon_scale_big from "../../assets/image/icon_scale_big.png";
import icon_scale_small from "../../assets/image/icon_scale_small.png";

export default function MapSetting() {
    return (
        <div className="map-setting">
            <div className="map-setting-item">
                <img src={icon_map} alt="" />
            </div>
            <div className="map-setting-item">
                <img src={icon_scale_big} alt="" />
            </div>
            <div className="map-setting-item">
                <img className="icon-scale-small" src={icon_scale_small} alt="" />
            </div>
        </div>
    );
}
