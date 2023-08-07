import React, { useState, ReactNode } from "react";
import { Drawer, Checkbox } from "antd";
// import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
const CheckboxGroup = Checkbox.Group;
import CustomCloseIcon from "../CustomCloseIcon";
import style from "./index.module.css";
import icon_2mtem from "../../assets/image/icon_2m_tem.png";
import icon_10m_wind_direction from "../../assets/image/icon_10m_wind_direction.png";
import icon_10m_wend_speed from "../../assets/image/icon_10m_wend_speed.png";
import icon_rain from "../../assets/image/icon_rain.png";
import icon_visibility from "../../assets/image/icon_visibility.png";
import icon_low_cloud_cover from "../../assets/image/icon_low_cloud_cover.png";
import icon_low_clouds_high from "../../assets/image/icon_low_clouds_high.png";

type SettingItemProps = { children: ReactNode; title: string };
const SettingItem = function ({ children, title }: SettingItemProps) {
    return (
        <div className={style.verificationElements}>
            <div className={style.elementsHeader}>
                <div className={style.elementsHeaderTitle}>{title}</div>
                <div className={style.splitLine}></div>
            </div>
            {children}
        </div>
    );
};

type props = { open: boolean; onClose: (isShow: boolean) => void };
const plainOptions = ["EC", "NCEP_GFS", "业务预报", "特定试验", "订正预报"];
const defaultCheckedList: string[] = [];
const startTimeOptions = ["08", "12"];
const startTimedefaultCheckedList: string[] = [];
export default function AirportVerificationSettingDrawer({ open, onClose }: props) {
    const [elementSelectId, setElementSelectId] = useState(0);
    const [timeIntervalSelectId, setTimeIntervalSelectId] = useState(0);
    const [forecastTime, setForecastTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [method, setMethod] = useState(0);
    const [modelCheckedList, setModelCheckList] = useState<CheckboxValueType[]>(defaultCheckedList);
    const [startTimeCheckedList, setStartTimeCheckList] = useState<CheckboxValueType[]>(startTimedefaultCheckedList);
    const handleCloseDrawer = () => {
        onClose(false);
    };
    const elementsBtnList = [
        { id: 1, label: "2m气温", src: icon_2mtem, style: { width: "22px", height: "32px" } },
        { id: 2, label: "10m风向", src: icon_10m_wind_direction, style: { width: "28px", height: "28px" } },
        { id: 3, label: "10m风速", src: icon_10m_wend_speed, style: { width: "28px", height: "22px" } },
        { id: 4, label: "降水", src: icon_rain, style: { width: "26px", height: "26px" } },
        { id: 5, label: "能见度", src: icon_visibility, style: { width: "26.6px", height: "22px" } },
        { id: 6, label: "低云云量", src: icon_low_cloud_cover, style: { width: "28.6px", height: "22px" } },
        { id: 7, label: "低云云底高", src: icon_low_clouds_high, style: { width: "26px", height: "26px" } }
    ];
    const timeIntervalList = [
        { id: 1, label: "1H" },
        { id: 2, label: "3H" },
        { id: 3, label: "6H" },
        { id: 4, label: "12H" },
        { id: 5, label: "24H" }
    ];
    const forecastTimeList = [
        { id: 1, label: "24H" },
        { id: 2, label: "48H" },
        { id: 3, label: "72H" },
        { id: 4, label: "96H" },
        { id: 5, label: "120H" }
    ];
    const durationList = [
        { id: 1, label: "过去1天" },
        { id: 2, label: "过去2天" },
        { id: 3, label: "过去3天" }
    ];
    const methodsList = [
        { id: 1, label: "ME" },
        { id: 2, label: "MAE" },
        { id: 3, label: "RMSE" },
        { id: 4, label: "PC" }
    ];
    const handleSelectElements = (item: any) => {
        // console.log("选择要素", item);
        setElementSelectId(item.id);
    };
    const handleSelectTimeInterval = (item: any) => {
        setTimeIntervalSelectId(item.id);
    };
    const handleChangeForecastTime = (item: any) => {
        setForecastTime(item.id);
    };
    const handleChangeDuration = (item: any) => {
        setDuration(item.id);
    };
    const handleChangeMethod = (item: any) => {
        setMethod(item.id);
    };
    const handleChangeModelCheckedList = (list: CheckboxValueType[]) => {
        setModelCheckList(list);
        // setIndeterminate(!!list.length && list.length < plainOptions.length);
        // setCheckAll(list.length === plainOptions.length);
    };
    const handleChangeStartTimeCheckedList = (list: CheckboxValueType[]) => {
        setStartTimeCheckList(list);
    };
    return (
        <>
            <Drawer
                width={600}
                title={<div style={{ fontSize: "24px", fontWeight: "bold", color: "#3D3D3D" }}>机场检验设置</div>}
                headerStyle={{ padding: "20px 0 20px 0", borderBottom: "none", textAlign: "center" }}
                bodyStyle={{ padding: 0 }}
                rootClassName="drawer-container"
                placement="right"
                onClose={handleCloseDrawer}
                open={open}
                closeIcon={<CustomCloseIcon></CustomCloseIcon>}
            >
                <SettingItem title="检验要素">
                    <div className={style.elementsBtn}>
                        {elementsBtnList.map((item) => (
                            <div
                                className={`${style.elementsItem} ${
                                    item.id === elementSelectId ? style.elementsItemActive : ""
                                }`}
                                onClick={() => handleSelectElements(item)}
                                key={item.id}
                            >
                                <img style={item.style} src={item.src} alt="" />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </SettingItem>
                <SettingItem title="检验模式">
                    <div className={`${style.elementsBtn} ${style.pl5}`}>
                        <CheckboxGroup
                            className="custom-checkbox-group"
                            options={plainOptions}
                            value={modelCheckedList}
                            onChange={handleChangeModelCheckedList}
                        />
                    </div>
                </SettingItem>
                <SettingItem title="检验起报时次">
                    <div className={`${style.elementsBtn} ${style.pl5}`}>
                        <CheckboxGroup
                            className="custom-checkbox-group"
                            options={startTimeOptions}
                            value={startTimeCheckedList}
                            onChange={handleChangeStartTimeCheckedList}
                        />
                    </div>
                </SettingItem>
                <SettingItem title="检验时间间隔">
                    <div className={style.elementsBtn}>
                        {timeIntervalList.map((item) => (
                            <div
                                className={`${style.elementsItem} ${style.timeintervalItem} ${
                                    item.id === timeIntervalSelectId ? style.elementsItemActive : ""
                                }`}
                                onClick={() => handleSelectTimeInterval(item)}
                                key={item.id}
                            >
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </SettingItem>
                <SettingItem title="检验预报时效">
                    <div className={style.elementsBtn}>
                        {forecastTimeList.map((item) => (
                            <div
                                className={`${style.elementsItem} ${style.timeintervalItem} ${
                                    item.id === forecastTime ? style.elementsItemActive : ""
                                }`}
                                onClick={() => handleChangeForecastTime(item)}
                                key={item.id}
                            >
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </SettingItem>
                <SettingItem title="检验时长">
                    <div className={style.elementsBtn}>
                        {durationList.map((item) => (
                            <div
                                className={`${style.elementsItem} ${
                                    item.id === duration ? style.elementsItemActive : ""
                                }`}
                                onClick={() => handleChangeDuration(item)}
                                key={item.id}
                            >
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </SettingItem>
                <SettingItem title="检验数值">
                    <div className={style.elementsBtn}>
                        {methodsList.map((item) => (
                            <div
                                className={`${style.elementsItem} ${
                                    item.id === method ? style.elementsItemActive : ""
                                }`}
                                onClick={() => handleChangeMethod(item)}
                                key={item.id}
                            >
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </SettingItem>
            </Drawer>
        </>
    );
}
