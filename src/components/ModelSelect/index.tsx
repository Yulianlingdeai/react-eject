import React, { useState } from "react";
import "./index.css";
import icon_arrow_down from "../../assets/image/icon_arrow_down.png";

export default function ModelSelect() {
    const [isShowModelSelect, setIsShowModelSelect] = useState(false);
    const [model, setModel] = useState("EC");
    const modelList = ["EC", "TIANJI"];
    const handleSelectModel = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, modelName: string) => {
        e.stopPropagation();
        setModel(modelName);
        setIsShowModelSelect(false);
    };
    return (
        <div className="model-select" onClick={() => setIsShowModelSelect((isShowModelSelect) => !isShowModelSelect)}>
            <div className="model-label">{model}</div>
            <img className="arrow" src={icon_arrow_down} alt="" />
            {isShowModelSelect && (
                <ul className="select-options">
                    {modelList.map((item) => (
                        <li className="option-item" key={item} onClick={(e) => handleSelectModel(e, item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
