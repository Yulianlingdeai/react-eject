import React, { useEffect } from "react";
import style from "./index.module.css";
import logo from "../../assets/image/logo.png";

type props = { onClick: () => void };
export default function Header({ onClick }: props) {
    useEffect(() => {
        console.log("Header挂载");
    }, []);
    return (
        <header className={style.header} onClick={onClick}>
            <div className={style.logo}>
                <img src={logo} alt="logo" />
            </div>
            <h1>对比检验平台</h1>
        </header>
    );
}
