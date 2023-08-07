import React, { useState } from "react";
import style from "./index.module.css";

export default function VerificationMethods() {
    const [currentMethod, setCurrentMethod] = useState("ME");
    const methodsList = [{ label: "ME" }, { label: "MAE" }, { label: "PMSE" }, { label: "PC" }];
    return (
        <div className={style.methods}>
            {methodsList.map((item) => (
                <div
                    className={`${style.methodsItem} ${currentMethod === item.label ? style.active : ""}`}
                    key={item.label}
                    onClick={() => setCurrentMethod(item.label)}
                >
                    {item.label}
                </div>
            ))}
        </div>
    );
}
