import React from "react";
import style from "./index.module.css";
import icon_close from "../../assets/image/icon_close.png";

type props = { className?: string; onClick?: () => void };
export default function CustomCloseIcon({ className, onClick }: props) {
    return (
        <div className={`${style.container} ${className}`} onClick={onClick}>
            <img src={icon_close} alt="" />
        </div>
    );
}
