import React from "react";
import { Button, ConfigProvider } from "antd";
import style from "./index.module.css";
import icon_close from "../../assets/image/icon_close.png";

type props = { className?: string; onClick?: () => void; backgroundColor?: string };
export default function CustomCloseIcon({ className, onClick, backgroundColor }: props) {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: backgroundColor ? backgroundColor : "#135685",
                        algorithm: true
                    }
                }
            }}
        >
            <Button type="primary" className={`${style.container} ${className}`} onClick={onClick}>
                <img width={17.5} height={17} src={icon_close} alt="" />
            </Button>
        </ConfigProvider>
    );
}
