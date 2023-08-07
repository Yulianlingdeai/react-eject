import React from "react";
import style from "./index.module.css";
import icon_close from "../../assets/image/icon_close.png";

type props = { className?: string };
export default function CustomCloseIcon({ className }: props) {
    return (
        <div className={`${style.container} ${className}`}>
            <img src={icon_close} alt="" />
        </div>
    );
}
