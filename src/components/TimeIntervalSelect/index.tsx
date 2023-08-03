import React, { useState } from "react";
import "../ModelSelect/index.css";
import "./index.css";
import icon_arrow_down from "../../assets/image/icon_arrow_down.png";

export default function TimeIntervalSelect() {
    const [isShowModelSelect, setIsShowModelSelect] = useState(false);
    const [model, setModel] = useState("+54H");
    const modelList = ["+03H", "+06H", "+09H", "+12H", "+15H"];
    const handleSelectModel = (modelName: string) => {
        setModel(modelName);
        setIsShowModelSelect(false);
    };
    return (
        <div className="model-select time-interval-select">
            <div className="model-label" onClick={() => setIsShowModelSelect(!isShowModelSelect)}>
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
