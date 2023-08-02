import React, { useState } from "react";
import "./index.css";

export default function VerificationMethods() {
    const [currentMethod, setCurrentMethod] = useState("ME");
    const methodsList = [{ label: "ME" }, { label: "MAE" }, { label: "PMSE" }, { label: "PC" }];
    return (
        <div className="verification-methods">
            {methodsList.map((item) => (
                <div
                    className={`methods-item ${
                        currentMethod === item.label ? "methods-item-active" : ""
                    }`}
                    key={item.label}
                    onClick={() => setCurrentMethod(item.label)}
                >
                    {item.label}
                </div>
            ))}
        </div>
    );
}
