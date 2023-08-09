import React from "react";
import style from "./index.module.css";
import CustomCloseIcon from "../CustomCloseIcon";

export default function ModalHeader({ children, onClose }: any) {
    return (
        <div className={style.modalHeader}>
            <h3>区域检验</h3>
            {children}
            <CustomCloseIcon className={style.close} onClick={onClose}></CustomCloseIcon>
        </div>
    );
}
