import React, { useState, useEffect } from "react";
import { Modal, DatePicker, Checkbox, Select, Radio, Space } from "antd";
import type { RadioChangeEvent } from "antd";
import type { DatePickerProps } from "antd/es/date-picker";
const CheckboxGroup = Checkbox.Group;
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import dayjs, { Dayjs } from "dayjs";
import ModalHeader from "../ModalHeader";
import style from "./index.module.css";
// import EchartComponent from "../EchartComponent";
import SwitchAirportStation from "../SwitchAirportStation";

import icon_2mtem from "../../assets/image/icon_2m_tem.png";
import icon_10m_wind_direction from "../../assets/image/icon_10m_wind_direction.png";
import icon_10m_wend_speed from "../../assets/image/icon_10m_wend_speed.png";
import icon_rain from "../../assets/image/icon_rain.png";
import icon_visibility from "../../assets/image/icon_visibility.png";
import icon_low_cloud_cover from "../../assets/image/icon_low_cloud_cover.png";
import icon_low_clouds_high from "../../assets/image/icon_low_clouds_high.png";

// import OperateButton from "../OperateButton";

type props = { open: boolean; onClose: () => void };
// const { RangePicker } = DatePicker;
const btnList = [
    { id: 1, label: "2m气温", src: icon_2mtem, style: { width: "22px", height: "32px" } },
    { id: 2, label: "10m风向", src: icon_10m_wind_direction, style: { width: "28px", height: "28px" } },
    { id: 3, label: "10m风速", src: icon_10m_wend_speed, style: { width: "28px", height: "22px" } },
    { id: 4, type: 1, label: "1h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
    { id: 5, type: 3, label: "3h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
    { id: 6, type: 24, label: "24h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
    { id: 7, label: "能见度", src: icon_visibility, style: { width: "26.6px", height: "22px" } },
    { id: 8, label: "低云云量", src: icon_low_cloud_cover, style: { width: "28.6px", height: "22px" } },
    { id: 9, label: "低云云底高", src: icon_low_clouds_high, style: { width: "26px", height: "26px" } }
];
const timeIntervalList = [
    { id: 1, label: "1H", value: "1H" },
    { id: 2, label: "3H", value: "3H" },
    { id: 3, label: "6H", value: "6H" },
    { id: 4, label: "12H", value: "12H" },
    { id: 5, label: "24H", value: "24H" }
];
const startTimeOptions = ["08", "12"];
const startTimedefaultCheckedList: string[] = [];
const plainOptions = ["EC", "NCEP_GFS", "业务预报", "特定试验", "订正预报"];
const defaultCheckedList: string[] = [];
export default function AirportVerificationModal({ open, onClose }: props) {
    const [operate, setOperate] = useState(0);
    const [methods, setMethods] = useState(1);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [startTimeCheckedList, setStartTimeCheckList] = useState<CheckboxValueType[]>(startTimedefaultCheckedList);
    const [modelCheckedList, setModelCheckList] = useState<CheckboxValueType[]>(defaultCheckedList);
    useEffect(() => {
        if (!open) {
            // 执行清理操作，比如取消事件监听或清除定时器
            return () => {
                // 清理逻辑
            };
        }
    }, [open]);
    const handleChangeMethods = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value);
        setMethods(e.target.value);
    };
    const handleCancel = () => {
        onClose();
    };
    const handleChangeStartTimeCheckedList = (list: CheckboxValueType[]) => {
        setStartTimeCheckList(list);
    };
    const onChange = (value: DatePickerProps["value"], dateString: [string, string] | string) => {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
    };

    const handleConfirmStartTime = (value: DatePickerProps["value"]) => {
        console.log("onOk: ", value);
        console.log("startTime", dayjs(value as Dayjs));
        setStartTime(dayjs(value as Dayjs));
    };
    const handleConfirmEndTime = (value: DatePickerProps["value"]) => {
        console.log("onOk: ", value);
        console.log("startTime", dayjs(value as Dayjs));
        setEndTime(dayjs(value as Dayjs));
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleChangeModelCheckedList = (list: CheckboxValueType[]) => {
        setModelCheckList(list);
        // setIndeterminate(!!list.length && list.length < plainOptions.length);
        // setCheckAll(list.length === plainOptions.length);
    };
    return (
        <Modal
            width={1080}
            title={
                <ModalHeader title="某某机场某某某检验" onClose={handleCancel}>
                    <SwitchAirportStation className={style.switchAirport}></SwitchAirportStation>
                </ModalHeader>
            }
            closeIcon={false}
            centered
            open={open}
            footer={null}
        >
            <ul className={style.verificationBtns}>
                {btnList.map((item) => (
                    <li
                        className={`${style.btnItem} ${item.id === operate ? style.active : ""}`}
                        key={item.id}
                        onClick={() => setOperate(item.id)}
                    >
                        <img style={item.style} src={item.src} alt="icon" />
                        {item.type && <span className={style.num}>{item.type}</span>}
                    </li>
                ))}
            </ul>
            <div className={style.searchForm}>
                <DatePicker
                    className={style.marginRight10}
                    value={startTime}
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="选择日期和时分"
                    onChange={onChange}
                    onOk={handleConfirmStartTime}
                />
                <DatePicker
                    className={style.marginRight10}
                    value={endTime}
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    placeholder="选择日期和时分"
                    onChange={onChange}
                    onOk={handleConfirmEndTime}
                />
                <div className={`${style.times} ${style.marginRight10}`}>
                    <CheckboxGroup
                        className="custom-checkbox-group"
                        options={startTimeOptions}
                        value={startTimeCheckedList}
                        onChange={handleChangeStartTimeCheckedList}
                    />
                </div>
                <Select defaultValue="+24H" style={{ width: 120 }} onChange={handleChange} options={timeIntervalList} />
            </div>
            <div className={style.main}>
                <div className={style.mainLeft}>
                    <CheckboxGroup
                        className={`${style.veriType} custom-checkbox-group`}
                        options={plainOptions}
                        value={modelCheckedList}
                        onChange={handleChangeModelCheckedList}
                    />
                    <Radio.Group className={style.customRadio} onChange={handleChangeMethods} value={methods}>
                        <Space direction="vertical">
                            <Radio value={1}>ME</Radio>
                            <Radio value={2}>MAE</Radio>
                            <Radio value={3}>RMSE</Radio>
                            <Radio value={4}>PC</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                <div className={style.mainRight}>
                    {/* <OperateButton></OperateButton> */}
                    <div className={style.echarts}>{/* <EchartComponent visible={open}></EchartComponent> */}</div>
                </div>
            </div>
        </Modal>
    );
}
