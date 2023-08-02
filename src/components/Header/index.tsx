import React, { useEffect } from "react";
import "./index.css";
// import icons from "../../utils/icons";
import logo from "../../assets/image/logo.png";

export default function Header() {
    useEffect(() => {
        console.log("挂载");
    }, []);
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <h1>对比检验平台</h1>
        </header>
    );
}
