import React, { useState } from "react";
import style from "../ModelSelect/index.module.css";
import style2 from "./index.module.css";
import icon_arrow_down from "../../assets/image/icon_arrow_down.png";

export default function TimeIntervalSelect() {
    const [isShowModelSelect, setIsShowModelSelect] = useState(false);
    const [model, setModel] = useState("+54H");
    const modelList = ["+03H", "+06H", "+09H", "+12H", "+15H"];
    const handleSelectModel = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, modelName: string) => {
        e.stopPropagation();
        setModel(modelName);
        setIsShowModelSelect(false);
    };
    return (
        <div
            className={`${style.select} ${style2.select}`}
            onClick={() => setIsShowModelSelect((isShowModelSelect) => !isShowModelSelect)}
        >
            <div className={style.label}>{model}</div>
            <img className={style.arrow} src={icon_arrow_down} alt="" />
            {isShowModelSelect && (
                <ul className={style.options}>
                    {modelList.map((item) => (
                        <li className={style.optionsItem} key={item} onClick={(e) => handleSelectModel(e, item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
