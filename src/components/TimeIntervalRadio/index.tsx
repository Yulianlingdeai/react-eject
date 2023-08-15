import React from "react";
import { Button } from "antd";
// ConfigProvider
import style from "./index.module.css";
import icon_back from "../../assets/image/icon_back.svg";

type optionItem = { label: string; value: number };
type props = {
    timeIntervalList: optionItem[];
    position: number[];
    timeInterval: number;
    onChangeGap: (value: number) => void;
    onChangePosition: (value: number) => void;
};
export default function TimeIntervalRadio({
    timeIntervalList,
    position,
    timeInterval,
    onChangeGap,
    onChangePosition
}: props) {
    return (
        <div className={style.gapList}>
            <Button type="primary" className={style.gapButton} onClick={() => onChangePosition(-2)}>
                <img src={icon_back} alt="" />
                <img src={icon_back} alt="" />
            </Button>
            <Button type="primary" className={style.gapButton} onClick={() => onChangePosition(-1)}>
                <img src={icon_back} alt="" />
            </Button>
            <div className={style.gapContainer}>
                {timeIntervalList.slice(position[0], position[1]).map((item) => (
                    <Button
                        type="primary"
                        className={`${style.gapItem} ${timeInterval === item.value ? style.gapItemActive : ""}`}
                        key={item.value}
                        onClick={() => onChangeGap(item.value)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            <Button type="primary" className={`${style.gapButton} ${style.foword}`} onClick={() => onChangePosition(1)}>
                <img src={icon_back} alt="" />
            </Button>
            <Button type="primary" className={`${style.gapButton} ${style.foword}`} onClick={() => onChangePosition(2)}>
                <img src={icon_back} alt="" />
                <img src={icon_back} alt="" />
            </Button>
        </div>
    );
}
