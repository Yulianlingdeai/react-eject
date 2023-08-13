import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, DatePicker, Form, Checkbox, Select, Radio } from "antd";
// const { Option } = Select;
import dayjs from "dayjs";
import style from "./index.module.css";
import ModalHeader from "../ModalHeader";
import OperateButton from "../OperateButton";
import EchartComponent from "../EchartComponent";
const CheckboxGroup = Checkbox.Group;
import icon_back from "../../assets/image/icon_back.svg";
import apis from "../../apis";
import type { configKeys, contentItem, methodItem, aoiItem, regionResultItem, modelListItem } from "../../typings";

type props = { open: boolean; onClose: () => void; showCustomArea?: () => void };
type obsItem = { label: string; value: string | number };
const startTimeOptions = [
    { label: "08", value: "08" },
    { label: "20", value: "20" }
];
const scoreTypeList = [
    { label: "逐日评分", value: "ZR" },
    { label: "综合评分", value: "ZH" }
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
const buttonThemeConfig = {
    colorPrimary: "#cc8f21",
    algorithm: true
};
export default function AreaVerificationModal({ open, onClose }: props) {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    // getFieldDecorator
    const { getFieldValue } = form2;
    const [allModelList, setAllModelList] = useState<modelListItem[]>([]);
    // 模式选择下拉框
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [currentElem, setCurrentElem] = useState("");
    const [currentMethodValue, setCurrentMethodValue] = useState("");
    const [gap, setGap] = useState(24);
    const [veriContentList, setVeriContentList] = useState<contentItem[]>([]);
    const [veriMethodList, setVeriMethodList] = useState<methodItem[]>([]);
    const [aoiList, setAoiList] = useState<aoiItem[]>([]);
    const [obsList, setObsList] = useState<obsItem[]>([]);
    const [productList, setProductList] = useState<obsItem[]>([]);
    const [areaList, setAreaList] = useState<obsItem[]>([]);
    const [forcastHourList, setForcastHourList] = useState<obsItem[]>([]);
    const [echartsData, setEchartsData] = useState<regionResultItem[]>([]);
    const [basicData, setBasicData] = useState({
        models: [] as string[]
    });
    useEffect(() => {
        // const getAllModelList = async () => {
        //     try {
        //         const res = await apis.getModelList();
        //         console.log("modelList======================", res);
        //         setAllModelList(res);
        //     } catch (e) {
        //         console.log(e);
        //     }
        // };
        const fetchConfig = async () => {
            try {
                const response = await apis.getModelList();
                console.log("modelList======================", response);
                setAllModelList(response);
                const res = await apis.getVeriConfigParamsByFuncKey({ keyName: "REGION" });
                console.log("区域检验的检验参数", res.REGION);
                const data = res.REGION;
                delete data.des;
                const sortList = Object.keys(data)
                    .map((item) => data[item as configKeys])
                    .sort((a, b) => a.sort - b.sort);
                const contentList = sortList.reduce((total, item) => {
                    const list = item.aoi.contents.sort((a, b) => a.sort - b.sort);
                    return [...total, ...list];
                }, [] as contentItem[]);
                // 更新状态放在 fetchConfig 内部
                setAoiList(sortList);
                setVeriContentList(contentList);
                const firstContent = contentList[0];
                setCurrentElem(firstContent.elem);
                const currentContent = sortList.find((item) =>
                    item.aoi.contents.find((element) => element.elem === firstContent.elem)
                );
                if (currentContent) {
                    setVeriMethodList(currentContent.moc.contents);
                    const firstMethod = currentContent.moc.contents[0];
                    setCurrentMethodValue(firstMethod.value);
                }
                getObsList(firstContent);
                getProductList(firstContent);
                getForcastHour(firstContent);
            } catch (e) {
                console.log("error", e);
            }
        };
        // getAllModelList();
        fetchConfig(); // 调用获取数据的函数
    }, []);
    const onFinish = () => {};
    /**检验查询 */
    const handleSearchResult = async (values: any) => {
        console.log("Success:", values);
        const { startTime, endTime, models, time, obsName, regionId } = values;
        const veriType = getFieldValue("veriType");
        // const forcastHour = getFieldValue("forcastHour");
        try {
            const data = {
                startTime: dayjs(startTime).format("YYYY-MM-DD"),
                endTime: dayjs(endTime).format("YYYY-MM-DD"),
                aoi: currentElem,
                moc: currentMethodValue,
                time: time.join(","),
                obsName: obsName.join(","),
                models: models.join(","),
                forcastHour: gap,
                pressType: "SURF",
                pressValue: "0",
                regionId: regionId,
                // titleName: "示例：四川省2022-07-08~2022-07-10 24H时次间隔 气温平均误差",
                veriType: veriType
            };
            const res = await apis.getRegionVeriResult(data);
            console.log(res);
            setBasicData({
                models: models
            });
            setEchartsData(res);
        } catch (e) {
            console.log("error", e);
        }
    };
    /**获取实况列表 */
    const getObsList = (content: contentItem) => {
        const list = content.obs_array.split(",").map((item) => {
            return {
                label: item,
                value: item
            };
        });
        setObsList(list);
    };
    /**获取产品列表 */
    const getProductList = (content: contentItem) => {
        const list = content.model_array.split(",").map((item) => {
            const model = allModelList.find((model) => model.modelKey === item) as modelListItem;
            return {
                label: model.modelKey,
                value: item
            };
        });
        setProductList(list);
    };
    /**选择检验内容 */
    const handleSelectContent = (elem: string) => {
        setCurrentElem(elem);
        const currentContent = aoiList.find((item) => item.aoi.contents.some((element) => element.elem === elem));
        if (currentContent) {
            setVeriMethodList(currentContent.moc.contents);
            const currentMethod = currentContent.moc.contents.find((element) => element.value === currentMethodValue);
            console.log("currentMethod===>>>", currentMethod);
            if (!currentMethod) {
                const firstMethod = currentContent.moc.contents[0];
                setCurrentMethodValue(firstMethod.value);
            }
        }
    };
    /**获取时效间隔 */
    const getForcastHour = (content: contentItem) => {
        const list = content.forcastHour.split(",").map((item) => {
            return {
                label: item,
                value: item
            };
        });
        setForcastHourList(list);
    };
    const handleDeselect = (value: string) => {
        console.log(`Tag "${value}" has been deselected.`);
    };
    /**通过关闭选择tag查询区域 */
    const handleChangeModels = (models: string[], option: any) => {
        if (!isDropdownOpen) {
            console.log("收到关闭===》》》", models, option);
            if (models.length) {
                getRegionListByModels(models);
            }
        }
    };
    /**关闭模式下拉框查询区域 */
    const handleDropdownVisibleChange = (open: boolean) => {
        if (!open) {
            console.log("关闭下拉框是");
            const models = form.getFieldValue("models");
            if (models.length) {
                getRegionListByModels(models);
            }
        }
    };
    /**根据选择模式（产品）查询区域 */
    const getRegionListByModels = async (models: string[]) => {
        try {
            const res = await apis.getRegionListByModels({ models: models.join(",") });
            console.log("区域列表===>>>>>", res);
            setAreaList(
                res.fixedRegionInfo.map((item) => {
                    return {
                        label: item.regionName,
                        value: item.regionId
                    };
                })
            );
        } catch (e) {
            console.log(e);
        }
    };
    const handleSelectMethod = (value: string) => {
        setCurrentMethodValue(value);
    };
    const handleCancel = () => {
        onClose();
    };
    /**改变区域 */
    const handleChangeArea = () => {
        // showCustomArea();
    };

    const handleChangeGap = (value: number) => {
        setGap(value);
    };
    return (
        <Modal
            width={1280}
            title={<ModalHeader title="区域检验" onClose={handleCancel} />}
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
                                onClick={() => handleSelectContent(item.elem)}
                                className={`${style.button} ${item.elem === currentElem ? style.active : ""}`}
                                key={item.elem}
                                type="primary"
                            >
                                {item.des}
                            </Button>
                        ))}
                    </div>
                    <div className={style.head}>检验方法</div>
                    <div className={style.content}>
                        {veriMethodList.map((item) => (
                            <Button
                                onClick={() => handleSelectMethod(item.value)}
                                className={`${style.button} ${item.value === currentMethodValue ? style.active : ""}`}
                                key={item.value}
                                type="primary"
                            >
                                {item.des}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className={style.container}>
                    <div className={`${style.searchBasic} areaForm`}>
                        <Form
                            layout="inline"
                            colon={false}
                            onFinish={handleSearchResult}
                            form={form}
                            initialValues={{
                                layout: "inline",
                                startTime: dayjs("2023-07-01"),
                                endTime: dayjs("2023-07-10"),
                                time: ["08"],
                                models: [],
                                obsName: [],
                                regionId: null
                            }}
                        >
                            <Form.Item label="起始时间" name="startTime" style={{ marginBottom: "10px" }}>
                                <DatePicker />
                            </Form.Item>
                            <Form.Item label="时次" name="time" style={{ marginBottom: "10px" }}>
                                <CheckboxGroup
                                    className="custom-checkbox-group form-group-box"
                                    options={startTimeOptions}
                                />
                            </Form.Item>
                            <Form.Item label="实况" name="obsName" style={{ marginBottom: "10px" }}>
                                <Select
                                    mode="multiple"
                                    showSearch={false}
                                    allowClear
                                    style={{ minWidth: "310px" }}
                                    placeholder="请选择实况"
                                    options={obsList}
                                />
                            </Form.Item>
                            <Form.Item label="结束时间" name="endTime">
                                <DatePicker />
                            </Form.Item>
                            <Form.Item label="产品" name="models">
                                <Select
                                    mode="multiple"
                                    showSearch={false}
                                    maxTagCount="responsive"
                                    allowClear
                                    style={{ minWidth: "310px" }}
                                    placeholder="请选择产品"
                                    open={isDropdownOpen}
                                    onFocus={() => setDropdownOpen(true)}
                                    onBlur={() => setDropdownOpen(false)}
                                    onChange={handleChangeModels}
                                    onDropdownVisibleChange={handleDropdownVisibleChange}
                                    onDeselect={handleDeselect}
                                    options={productList}
                                />
                            </Form.Item>
                            <Form.Item label="区域" name="regionId">
                                <Select
                                    allowClear
                                    showSearch={false}
                                    style={{ minWidth: "140px" }}
                                    placeholder="请选择区域"
                                    onChange={handleChangeArea}
                                    options={areaList}
                                />
                            </Form.Item>
                            <Form.Item>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: buttonThemeConfig
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
                            initialValues={{ layout: "inline", veriType: "ZR", forcastHour: null }}
                        >
                            <Form.Item label="评分" name="veriType">
                                <Radio.Group className="form-group-box">
                                    {scoreTypeList.map((item) => (
                                        <Radio key={item.value} value={item.value}>
                                            {item.label}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="间隔" name="forcastHour">
                                <Select
                                    allowClear
                                    style={{ width: "100px" }}
                                    placeholder="请选择间隔"
                                    options={forcastHourList}
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
                        <EchartComponent basicData={basicData} echartsData={echartsData}></EchartComponent>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
