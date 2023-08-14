import React from "react";
import style from "./index.module.css";
import icon_back from "../../assets/image/icon_back.svg";

type optionItem = { label: string; value: number };
type props = {
    timeIntervalList: optionItem[];
    position: number[];
    gap: number;
    onChangeGap: (value: number) => void;
    onChangePosition: (value: number) => void;
};
export default function TimeIntervalRadio({ timeIntervalList, position, gap, onChangeGap, onChangePosition }: props) {
    return (
        <div className={style.gapList}>
            <div className={style.gapButton} onClick={() => onChangePosition(-2)}>
                <img src={icon_back} alt="" />
                <img src={icon_back} alt="" />
            </div>
            <div className={style.gapButton} onClick={() => onChangePosition(-1)}>
                <img src={icon_back} alt="" />
            </div>
            <div className={style.gapContainer}>
                {timeIntervalList.slice(position[0], position[1]).map((item) => (
                    <div
                        className={`${style.gapItem} ${gap === item.value ? style.gapItemActive : ""}`}
                        key={item.value}
                        onClick={() => onChangeGap(item.value)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            <div className={`${style.gapButton} ${style.foword}`} onClick={() => onChangePosition(1)}>
                <img src={icon_back} alt="" />
            </div>
            <div className={`${style.gapButton} ${style.foword}`} onClick={() => onChangePosition(2)}>
                <img src={icon_back} alt="" />
                <img src={icon_back} alt="" />
            </div>
        </div>
    );
}
