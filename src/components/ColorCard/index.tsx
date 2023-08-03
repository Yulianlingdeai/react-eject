import React from "react";
import "./index.css";

export default function ColorCard() {
    const colorList = [
        { id: 1, color: "#C727AC", value: 3.5 },
        { id: 2, color: "#9C1333", value: 3.0 },
        { id: 3, color: "#C72727", value: 2.5 },
        { id: 4, color: "#C76827", value: 2.0 },
        { id: 5, color: "#DBDC56", value: 1.5 },
        { id: 6, color: "#6156DC", value: 1.0 },
        { id: 7, color: "#56DCD6", value: 0.5 }
    ];
    return (
        <div className="color-card">
            <div className="color-title">
                <div className="color-text">AE</div>
                <div className="color-unit">°C</div>
            </div>
            <div className="color-container">
                <ul className="color-box">
                    {colorList.map((item, index) => (
                        <div
                            className="color-item"
                            style={{
                                background: item.color,
                                borderBottom:
                                    index === colorList.length - 1 ? "none" : "1px solid #ffffff"
                            }}
                            key={item.id}
                        ></div>
                    ))}
                </ul>
                <ul className="color-text-box">
                    {colorList.map((item) => (
                        <div className="color-text-item" key={item.id}>
                            {item.value.toFixed(1)}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}
