import React, { useState } from "react";
import "./index.css";
import icon_arrow_down from "../../assets/image/icon_arrow_down.png";

export default function ModelSelect() {
    const [isShowModelSelect, setIsShowModelSelect] = useState(false);
    const [model, setModel] = useState("EC");
    const modelList = ["EC", "TIANJI"];
    const handleSelectModel = (modelName: string) => {
        setModel(modelName);
        setIsShowModelSelect(false);
    };
    return (
        <div className="model-select">
            <div className="model-label" onClick={() => setIsShowModelSelect(true)}>
                {model}
            </div>
            <img className="arrow" src={icon_arrow_down} alt="" />
            {isShowModelSelect && (
                <ul className="select-options">
                    {modelList.map((item) => (
                        <li
                            className="option-item"
                            key={item}
                            onClick={() => handleSelectModel(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
