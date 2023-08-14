import React, { useEffect, useState } from "react";
import { Modal, Button, ConfigProvider, DatePicker, Form, Checkbox, Select, Radio } from "antd";
// const { Option } = Select;
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import style from "./index.module.css";
import ModalHeader from "../ModalHeader";
import OperateButton from "../OperateButton";
import EchartComponent from "../EchartComponent";
import { downLoadFile } from "../../utils";
const CheckboxGroup = Checkbox.Group;
import icon_back from "../../assets/image/icon_back.svg";
import apis from "../../apis";
import type {
    configKeys,
    contentItem,
    methodItem,
    aoiItem,
    regionResultItem,
    modelListItem,
    obsListItem,
    basicData
} from "../../typings";

type props = { open: boolean; onClose: () => void; showCustomArea?: () => void };
type normalOptionItem = { label: string; value: string | number };
type modelOptionItem = { forcastHour: string[]; label: string; value: string | number };
type optionItem = { label: string; value: number };
const startTimeOptions = [
    { label: "08", value: "08" },
    { label: "20", value: "20" }
];
const scoreTypeList = [
    { label: "逐日评分", value: "ZR" },
    { label: "综合评分", value: "ZH" }
];
// const gapList = [
//     { label: "24H", value: 24 },
//     { label: "48H", value: 48 },
//     { label: "72H", value: 72 },
//     { label: "96H", value: 96 },
//     { label: "120H", value: 120 },
//     { label: "144H", value: 144 },
//     { label: "168H", value: 168 },
//     { label: "192H", value: 192 }
// ];
const buttonThemeConfig = {
    colorPrimary: "#cc8f21",
    algorithm: true
};
export default function AreaVerificationModal({ open, onClose }: props) {
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    // getFieldDecorator
    const { getFieldValue, setFieldValue } = form2;
    const [allModelList, setAllModelList] = useState<modelListItem[]>([]);
    const [allObsList, setAllObsList] = useState<obsListItem[]>([]);
    const [initialized, setInitialized] = useState(false);
    // 模式选择下拉框
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [currentElem, setCurrentElem] = useState("");
    const [currentMethodValue, setCurrentMethodValue] = useState("");
    const [gap, setGap] = useState(24);
    const [veriContentList, setVeriContentList] = useState<contentItem[]>([]);
    const [contentText, setContentText] = useState("");
    const [veriMethodList, setVeriMethodList] = useState<methodItem[]>([]);
    const [methodText, setMethodText] = useState("");
    const [rainVeriTypeList, setRainVeriTypeList] = useState<optionItem[]>([]);
    const [analyseType, setAnalyseType] = useState(2);
    const [aoiList, setAoiList] = useState<aoiItem[]>([]);
    const [obsList, setObsList] = useState<normalOptionItem[]>([]);
    const [productList, setProductList] = useState<modelOptionItem[]>([]);
    const [areaList, setAreaList] = useState<normalOptionItem[]>([]);
    const [forcastHourDetailList, setForcastHourDetailList] = useState<optionItem[]>([]);
    const [forcastHourList, setForcastHourList] = useState<normalOptionItem[]>([]);
    const [echartsData, setEchartsData] = useState<regionResultItem[]>([]);
    const [basicData, setBasicData] = useState<basicData>({
        models: [],
        analyseType: 2,
        title: "",
        type: "bar"
    });
    const areaVeriType = getFieldValue("veriType");
    const [exportTableData, setExportTableData] = useState({});
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await apis.getModelList();
                setAllModelList(response);
                const obsResponse = await apis.getObsConfigList();
                setAllObsList(obsResponse);
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
                    setMethodText(firstMethod.des);
                    if (firstMethod.ins_type && firstMethod.ins_type === "Y") {
                        setRainVeriTypeList([
                            { label: "累加检验", value: 1 },
                            { label: "分级检验", value: 0 }
                        ]);
                        setAnalyseType(1);
                    } else {
                        setRainVeriTypeList([]);
                        setAnalyseType(2);
                    }
                }
                const list1 = firstContent.obs_array.split(",").map((item) => {
                    const obs = obsResponse.find((obsItem) => obsItem.obsKey === item) as obsListItem;
                    return {
                        label: obs.obsName,
                        value: item
                    };
                });
                setObsList(list1);
                const list2 = firstContent.model_array.split(",").map((item) => {
                    const model = response.find((model) => model.modelKey === item) as modelListItem;
                    return {
                        forcastHour: model.forcastHour ? model.forcastHour.split(",") : [],
                        label: model.modelName,
                        value: item
                    };
                });
                setProductList(list2);
                const list4 = list2.reduce((total, item) => {
                    const list = item.forcastHour.map((element) => {
                        return { label: `${element}H`, value: +element };
                    });
                    return [...total, ...list];
                }, [] as optionItem[]);
                setForcastHourDetailList(list4);
                const list3 = firstContent.forcastHour.split(",").map((item) => {
                    return {
                        label: item,
                        value: item
                    };
                });
                setForcastHourList(list3);
                setInitialized(true);
            } catch (e) {
                console.log("error", e);
            }
        };
        fetchConfig(); // 调用获取数据的函数
    }, []);
    /**加载完数据后初始化部分参数 */
    useEffect(() => {
        if (initialized) {
            if (forcastHourList.length) {
                const has = forcastHourList.some((item) => item.value === getFieldValue("forcastHour"));
                if (!has) {
                    setFieldValue("forcastHour", forcastHourList[0].value);
                }
            }
            if (allObsList.length && obsList.length) {
                const has = allObsList.some((item) => item.obsKey === "HTB");
                if (has) {
                    form.setFieldValue("obsName", ["HTB"]);
                }
            }
            if (allModelList.length && productList.length) {
                const has = allModelList.some((item) => item.modelKey === "EC");
                if (has) {
                    form.setFieldValue("models", ["EC"]);
                    getRegionListByModels(["EC"]).then((list) => {
                        console.log("list===>>>>>>>", list);
                        if (list && list.length) {
                            form.setFieldValue("regionId", 1001);
                        }
                    });
                }
            }
            setInitialized(false);
        }
    }, [
        initialized,
        forcastHourList,
        getFieldValue,
        setFieldValue,
        allObsList,
        obsList,
        form,
        allModelList,
        productList,
        areaList
    ]);
    /**检验查询 */
    const handleSearchResult = async (values: any) => {
        console.log("Success:", values);
        const { startTime, endTime, models, time, obsName, regionId } = values;
        const veriType = getFieldValue("veriType");
        try {
            const time1 = dayjs(startTime).format("YYYY-MM-DD");
            const time2 = dayjs(endTime).format("YYYY-MM-DD");
            const data = {
                startTime: time1,
                endTime: time2,
                aoi: currentElem,
                moc: currentMethodValue,
                time: time.join(","),
                obsName: obsName.join(","),
                models: models.join(","),
                forcastHour: gap,
                pressType: "SURF",
                pressValue: "0",
                regionId: regionId,
                titleName: `${time1}～${time2} ${time.join(
                    "+"
                )}时次 ${gap}H预报 ${contentText} ${methodText}（单位：°C）`,
                veriType: veriType,
                analyseType: analyseType
            };
            const res = await apis.getRegionVeriResult(data);
            console.log(res);
            setExportTableData(data);
            setBasicData({
                ...basicData,
                title: data.titleName,
                analyseType,
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
            const obs = allObsList.find((obsItem) => obsItem.obsKey === item) as obsListItem;
            return {
                label: obs.obsName,
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
                forcastHour: model.forcastHour ? model.forcastHour.split(",") : [],
                label: model.modelName,
                value: item
            };
        });
        setProductList(list);
    };
    /**选择检验内容 */
    const handleSelectContent = (content: contentItem) => {
        getProductList(content);
        getObsList(content);
        getForcastHour(content);
        setCurrentElem(content.elem);
        setContentText(content.des);
        const currentContent = aoiList.find((item) =>
            item.aoi.contents.some((element) => element.elem === content.elem)
        );
        if (currentContent) {
            setVeriMethodList(currentContent.moc.contents);
            const currentMethod = currentContent.moc.contents.find((element) => element.value === currentMethodValue);
            console.log("currentMethod===>>>", currentMethod);
            if (!currentMethod) {
                const firstMethod = currentContent.moc.contents[0];
                setCurrentMethodValue(firstMethod.value);
                setMethodText(firstMethod.des);
                getRainVeriTypeList(firstMethod);
            } else {
                getRainVeriTypeList(currentMethod);
            }
        }
    };
    /**降水分级还是累加 */
    const getRainVeriTypeList = (method: methodItem) => {
        if (method.ins_type && method.ins_type === "Y") {
            setRainVeriTypeList([
                { label: "累加检验", value: 1 },
                { label: "分级检验", value: 0 }
            ]);
            if (analyseType !== 2) {
                setAnalyseType(analyseType);
            } else {
                setAnalyseType(1);
            }
        } else {
            setRainVeriTypeList([]);
            setAnalyseType(2);
        }
    };
    /**获取时效间隔 */
    const getForcastHour = (content: contentItem) => {
        console.log("处理时效间隔");
        const list = content.forcastHour.split(",").map((item) => {
            return {
                label: item,
                value: item
            };
        });
        setForcastHourList(list);
        const has = list.some((item) => item.value === getFieldValue("forcastHour"));
        if (!has) {
            setFieldValue("forcastHour", list[0].value);
        }
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
        setDropdownOpen(open);
        if (!open) {
            console.log("关闭下拉框时");
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
            const list = res.fixedRegionInfo.map((item) => {
                return {
                    label: item.regionName,
                    value: item.regionId
                };
            });
            setAreaList(list);
            return list;
        } catch (e) {
            console.log(e);
        }
    };
    const handleSelectMethod = (method: methodItem) => {
        setCurrentMethodValue(method.value);
        getRainVeriTypeList(method);
        setMethodText(method.des);
    };
    /**改变区域 */
    const handleChangeArea = () => {
        // showCustomArea();
    };

    const handleChangeGap = (value: number) => {
        setGap(value);
    };
    /**下载图片 */
    const handleDownloadPicture = () => {
        const html = document.getElementById("chartBox") as HTMLElement;
        console.log(html.offsetWidth, html.offsetHeight);
        html2canvas(html, {
            ignoreElements: (element: Element) => {
                if (element.id === "chartsBtnTop" || element.id === "ts-btn-list") {
                    return true;
                }
                return false;
            },
            width: html.offsetWidth,
            height: html.offsetHeight
        }).then((canvas) => {
            const a = document.createElement("a");
            a.href = canvas.toDataURL();
            a.setAttribute("download", `${basicData.title}.jpeg`);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    };
    /**切换echarts类型 */
    const handleSwitchEchartType = (type: string) => {
        setBasicData({
            ...basicData,
            type: type
        });
    };
    /**导出表格 */
    const handleDownloadTable = async () => {
        try {
            const res = await apis.regionVeriResultExport(exportTableData);
            downLoadFile(res);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Modal
            width={1280}
            title={<ModalHeader title="区域检验" onClose={() => onClose()} />}
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
                                onClick={() => handleSelectContent(item)}
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
                                onClick={() => handleSelectMethod(item)}
                                className={`${style.button} ${item.value === currentMethodValue ? style.active : ""}`}
                                key={item.value}
                                type="primary"
                            >
                                {item.des}
                            </Button>
                        ))}
                    </div>
                    {rainVeriTypeList.length > 0 && (
                        <>
                            <div className={style.head}>检验类型</div>
                            <div className={style.content}>
                                {rainVeriTypeList.map((item) => (
                                    <Button
                                        onClick={() => setAnalyseType(item.value)}
                                        className={`${style.button} ${item.value === analyseType ? style.active : ""}`}
                                        key={item.value}
                                        type="primary"
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </>
                    )}
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
                                    maxTagCount="responsive"
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
                            form={form2}
                            initialValues={{
                                layout: "inline",
                                veriType: "ZR",
                                forcastHour: forcastHourList.length ? forcastHourList[0].value : null
                            }}
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

                            {areaVeriType === "ZR" && (
                                <div className={style.gapList}>
                                    <div className={style.gapButton}>
                                        <img src={icon_back} alt="" />
                                        <img src={icon_back} alt="" />
                                    </div>
                                    <div className={style.gapButton}>
                                        <img src={icon_back} alt="" />
                                    </div>
                                    <div className={style.gapContainer}>
                                        {forcastHourDetailList.slice(0, 8).map((item) => (
                                            <div
                                                className={`${style.gapItem} ${
                                                    gap === item.value ? style.gapItemActive : ""
                                                }`}
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
                            )}
                        </Form>
                    </div>
                    <div className={style.echartButton}>
                        <OperateButton
                            onClickDownloadPicture={handleDownloadPicture}
                            onClickDownloadTable={handleDownloadTable}
                            onClickSwitchEchartType={handleSwitchEchartType}
                            type={basicData.type}
                        ></OperateButton>
                    </div>
                    <div className={style.echartContainer}>
                        <EchartComponent basicData={basicData} echartsData={echartsData}></EchartComponent>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
