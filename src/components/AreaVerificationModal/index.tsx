import React, { useState } from "react";
import { Modal, Button, ConfigProvider, DatePicker, Form, Checkbox, Select } from "antd";
import style from "./index.module.css";
import ModalHeader from "../ModalHeader";
import OperateButton from "../OperateButton";
import EchartComponent from "../EchartComponent";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
const CheckboxGroup = Checkbox.Group;
import icon_back from "../../assets/image/icon_back.svg";

type props = { open: boolean; onClose: () => void };
const veriContentList = [
    { id: 1, label: "2m气温" },
    { id: 2, label: "10m风向" },
    { id: 3, label: "10m风速" },
    { id: 4, label: "10m综合风" },
    { id: 5, label: "12h降水" },
    { id: 6, label: "24h降水" },
    { id: 7, label: "能见度" },
    { id: 8, label: "低云云量" },
    { id: 9, label: "低云云底高" }
];
const veriMethodList = [
    { id: 1, label: "ME" },
    { id: 2, label: "MAE" },
    { id: 3, label: "RMSE" },
    { id: 4, label: "PC" }
];
const startTimeOptions = ["08", "12"];
const options = [
    { label: "实况一", value: 1 },
    { label: "实况二", value: 2 }
];
const gapList = [
    { label: "24H", value: 24 },
    { label: "48H", value: 48 },
    { label: "72H", value: 72 },
    { label: "96H", value: 96 },
    { label: "120H", value: 120 },
    { label: "144H", value: 144 },
    { label: "168H", value: 168 },
    { label: "192H", value: 192 }
];
export default function AreaVerificationModal({ open, onClose }: props) {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [contentId, setContentId] = useState(0);
    const [methodId, setMethodId] = useState(0);
    const [gap, setGap] = useState(0);
    const handleSelectContent = (id: number) => {
        setContentId(id);
    };
    const handleSelectMethod = (id: number) => {
        setMethodId(id);
    };
    const handleCancel = () => {
        onClose();
    };
    const onChange = () => {};
    const handleChangeStartTimeCheckedList = (list: CheckboxValueType[]) => {
        // setStartTimeCheckList(list);
        console.log(list);
    };
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    const onFinish = (values: any) => {
        console.log("Success:", values);
    };
    const handleChangeGap = (value: number) => {
        setGap(value);
    };
    return (
        <Modal
            width={1280}
            title={<ModalHeader onClose={handleCancel} />}
            closeIcon={false}
            centered
            open={open}
            footer={null}
        >
            <div className={style.areaContainer}>
                <div className={style.verificationContentMethod}>
                    <div className={style.head}>检验内容</div>
                    <div className={style.content}>
                        {veriContentList.map((item) => (
                            <Button
                                onClick={() => handleSelectContent(item.id)}
                                className={`${style.button} ${item.id === contentId ? style.active : ""}`}
                                key={item.id}
                                type="primary"
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>
                    <div className={style.head}>检验方法</div>
                    <div className={style.content}>
                        {veriMethodList.map((item) => (
                            <Button
                                onClick={() => handleSelectMethod(item.id)}
                                className={`${style.button} ${item.id === methodId ? style.active : ""}`}
                                key={item.id}
                                type="primary"
                            >
                                {item.label}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className={style.container}>
                    <div className={`${style.searchBasic} areaForm`}>
                        <Form
                            layout="inline"
                            colon={false}
                            onFinish={onFinish}
                            form={form}
                            initialValues={{ layout: "inline" }}
                        >
                            <Form.Item label="起始时间" name="startTime" style={{ marginBottom: "10px" }}>
                                <DatePicker onChange={onChange} />
                            </Form.Item>
                            <Form.Item label="时次" name="startTimeCheckedList" style={{ marginBottom: "10px" }}>
                                <div className={style.timeBox}>
                                    <CheckboxGroup
                                        className="custom-checkbox-group"
                                        options={startTimeOptions}
                                        onChange={handleChangeStartTimeCheckedList}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item label="实况" name="facts" initialValue={[]} style={{ marginBottom: "10px" }}>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ minWidth: "330px" }}
                                    placeholder="请选择实况"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                            <Form.Item label="结束时间" name="endTime">
                                <DatePicker onChange={onChange} />
                            </Form.Item>
                            <Form.Item label="产品" name="product" initialValue={[]}>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ minWidth: "330px" }}
                                    placeholder="请选择产品"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                            <Form.Item label="区域" name="area" initialValue={""}>
                                <Select
                                    allowClear
                                    style={{ minWidth: "163px" }}
                                    placeholder="请选择区域"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                            <Form.Item>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                colorPrimary: "#cc8f21",
                                                algorithm: true
                                            }
                                        }
                                    }}
                                >
                                    <Button className={style.queryButton} htmlType="submit" type="primary">
                                        检验查询
                                    </Button>
                                </ConfigProvider>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={`${style.searchOther} areaForm`}>
                        <Form
                            layout="inline"
                            colon={false}
                            onFinish={onFinish}
                            form={form2}
                            initialValues={{ layout: "inline" }}
                        >
                            <Form.Item label="评分" name="record">
                                <div className={style.timeBox}>
                                    <CheckboxGroup
                                        className="custom-checkbox-group"
                                        options={startTimeOptions}
                                        onChange={handleChangeStartTimeCheckedList}
                                    />
                                </div>
                            </Form.Item>
                            <Form.Item label="间隔" name="gap" initialValue={""}>
                                <Select
                                    allowClear
                                    style={{ minWidth: "100px" }}
                                    placeholder="请选择间隔"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                        </Form>
                        <div className={style.gapList}>
                            <div className={style.gapButton}>
                                <img src={icon_back} alt="" />
                                <img src={icon_back} alt="" />
                            </div>
                            <div className={style.gapButton}>
                                <img src={icon_back} alt="" />
                            </div>
                            <div className={style.gapContainer}>
                                {gapList.map((item) => (
                                    <div
                                        className={`${style.gapItem} ${gap === item.value ? style.gapItemActive : ""}`}
                                        key={item.value}
                                        onClick={() => handleChangeGap(item.value)}
                                    >
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                            <div className={`${style.gapButton} ${style.foword}`}>
                                <img src={icon_back} alt="" />
                            </div>
                            <div className={`${style.gapButton} ${style.foword}`}>
                                <img src={icon_back} alt="" />
                                <img src={icon_back} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={style.echartButton}>
                        <OperateButton></OperateButton>
                    </div>
                    <div className={style.echartContainer}>
                        <EchartComponent visible={open}></EchartComponent>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
