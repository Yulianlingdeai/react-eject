import React, { useEffect, useState } from "react";
import apis from "../../apis";
import dayjs from "dayjs";
import type { aoiItem, contentItem, configKeys, methodItem, modelListItem, stationItem } from "../../typings";

import icon_2mtem from "../../assets/image/icon_2m_tem.png";
import icon_10m_wind_direction from "../../assets/image/icon_10m_wind_direction.png";
import icon_10m_wend_speed from "../../assets/image/icon_10m_wend_speed.png";
import icon_rain from "../../assets/image/icon_rain.png";
import icon_visibility from "../../assets/image/icon_visibility.png";
import icon_low_cloud_cover from "../../assets/image/icon_low_cloud_cover.png";
import icon_low_clouds_high from "../../assets/image/icon_low_clouds_high.png";
import icon_arrow_down from "../../assets/image/icon_arrow_down.png";
import icon_retreat from "../../assets/image/icon_retreat.png";
import icon_forward from "../../assets/image/icon_forward.png";
import icon_pause from "../../assets/image/icon_pause.png";
import icon_date from "../../assets/image/icon_date.png";
import style from "./index.module.css";

type customInfo = {
    style: {
        width: string;
        height: string;
    };
    src: string;
};
type modelOptionItem = { forcastHour: string[]; label: string; value: string };
type optionItem = { label: string; value: string };
const btnList = [
    { id: 1, type: "AT", label: "2m气温", src: icon_2mtem, style: { width: "22px", height: "32px" } },
    { id: 2, type: "WD", label: "10m风向", src: icon_10m_wind_direction, style: { width: "28px", height: "28px" } },
    { id: 3, type: "WS", label: "10m风速", src: icon_10m_wend_speed, style: { width: "28px", height: "22px" } },
    { id: 4, type: "RAIN1", label: "1h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
    // { id: 5, type: 3, label: "3h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
    // { id: 6, type: 24, label: "24h降水", src: icon_rain, style: { width: "26px", height: "26px" } },
    { id: 7, type: "VIS", label: "能见度", src: icon_visibility, style: { width: "26.6px", height: "22px" } },
    { id: 8, type: "LN", label: "低云云量", src: icon_low_cloud_cover, style: { width: "28.6px", height: "22px" } },
    { id: 9, type: "LC", label: "低云云底高", src: icon_low_clouds_high, style: { width: "26px", height: "26px" } }
];
const tickList = [
    { id: 1, time: "08:00", day: "05-11", big: true },
    { id: 2, big: false },
    { id: 3, big: false },
    { id: 4, big: false },
    { id: 5, time: "20:00", big: true },
    { id: 6, big: false },
    { id: 7, big: false },
    { id: 8, big: false },
    { id: 9, time: "08:00", day: "05-12", big: true },
    { id: 10, big: false },
    { id: 11, big: false },
    { id: 12, big: false },
    { id: 13, time: "20:00", big: true },
    { id: 99, big: false },
    { id: 98, big: false },
    { id: 97, big: false },
    { id: 14, time: "08:00", day: "05-13", big: true },
    { id: 15, big: false },
    { id: 16, big: false },
    { id: 17, big: false },
    { id: 18, time: "20:00", big: true },
    { id: 19, big: false },
    { id: 20, big: false },
    { id: 21, big: false },
    { id: 22, time: "08:00", day: "05-14", big: true },
    { id: 23, big: false },
    { id: 24, big: false },
    { id: 25, big: false },
    { id: 26, time: "20:00", big: true }
];
type props = {
    onChangeStationList: (list: stationItem[]) => void;
};
export default function AirportVerificationComponents({ onChangeStationList }: props) {
    const [stationList, setStationList] = useState<stationItem[]>([]);
    const [allModelList, setAllModelList] = useState<modelListItem[]>([]);
    const [initialized, setInitialized] = useState(false);
    const [aoiList, setAoiList] = useState<aoiItem[]>([]);
    const [veriContentList, setVeriContentList] = useState<(contentItem & customInfo)[]>([]);
    // modelList=>当前检验内容可选的模式列表
    const [modelList, setModelList] = useState<modelOptionItem[]>([]);
    const [modelForcastHourList, setModelForcastHourList] = useState<optionItem[]>([]);
    const [forcastHour, setForcastHour] = useState("");
    const [isShowForcastHourSelect, setIsShowForcastHourSelect] = useState(false);
    const [methodList, setMethodList] = useState<methodItem[]>([]);
    const [methodValue, setMethodValue] = useState("");
    const [currentElem, setCurrentElem] = useState("");
    const [latestInitTime, setLatestInitTime] = useState("");
    const [isShowModelSelect, setIsShowModelSelect] = useState(false);
    const [model, setModel] = useState("");
    const handleSelectModel = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, modelItem: modelOptionItem) => {
        e.stopPropagation();
        setModel(modelItem.value);
        setIsShowModelSelect(false);
    };
    const handleSelectForcastHour = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, forcastHourItem: optionItem) => {
        e.stopPropagation();
        setForcastHour(forcastHourItem.value);
        setIsShowForcastHourSelect(false);
    };
    useEffect(() => {
        const getAirportConfigParams = async () => {
            try {
                const response = await apis.getModelList();
                setAllModelList(response);
                const res = await apis.getVeriConfigParamsByFuncKey({ keyName: "STATION" });
                console.log("单站检验的检验参数====>>>>>>", res);
                const data = res.STATION;
                delete data.des;
                const sortList = Object.keys(data)
                    .map((item) => data[item as configKeys])
                    .sort((a, b) => a.sort - b.sort);
                const list = sortList.reduce((total, item) => {
                    const list = item.aoi.contents
                        .sort((a, b) => a.sort - b.sort)
                        .filter((element) => element.elem !== "RAIN3" && element.elem !== "RAIN24");
                    return [...total, ...list];
                }, [] as contentItem[]);
                const contentList = list.map((item) => {
                    const currentStyle = btnList.find((element) => element.type === item.elem) as any;
                    return {
                        ...item,
                        style: currentStyle.style,
                        src: currentStyle.src
                    };
                });
                setAoiList(sortList);
                setVeriContentList(contentList);
                const firstContent = contentList.find((item) => item.elem === "AT") as contentItem & customInfo;
                setCurrentElem(firstContent.elem);
                const currentContent = sortList.find((item) =>
                    item.aoi.contents.find((element) => element.elem === firstContent.elem)
                ) as aoiItem;
                const list2 = currentContent.moc.contents.filter((item) => !item.value.includes("is_correct"));
                setMethodList(list2);
                const firstMethod = list2[0];
                setMethodValue(firstMethod.value);
                const list3 = firstContent.model_array.split(",").map((item) => {
                    const model = response.find((model) => model.modelKey === item) as modelListItem;
                    return {
                        forcastHour: model.forcastHour ? model.forcastHour.split(",") : [],
                        label: model.modelName,
                        value: item
                    };
                });
                setModelList(list3);
                let currentModel = "EC";
                const has = response.some((item) => item.modelKey === currentModel);
                if (has) {
                    setModel(currentModel);
                } else {
                    currentModel = list3[0].value;
                    setModel(currentModel);
                }
                const result = await apis.getModelInfoByModelKey({
                    modelKey: currentModel,
                    elem: firstContent.elem
                });
                console.log("根据模式和检验要素查询最新的起报时间和时效间隔", result);
                const list4 = result.modelForcastHourList.map((item) => {
                    return {
                        label: `+${item}H`,
                        value: item
                    };
                });
                setModelForcastHourList(list4);
                setForcastHour("24");
                //  - 24 * 60 * 60 * 1000
                const time = dayjs(result.latestInitTime).valueOf();
                setLatestInitTime(dayjs(time).format("YYYY-MM-DD HH:mm:ss"));
                setInitialized(true);
            } catch (e) {
                console.log(e);
            }
        };
        getAirportConfigParams();
    }, []);
    // const getModelInfoByModelKey = () => {
    //     try {
    //         const res = await apis.getModelInfoByModelKey();
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };
    useEffect(() => {
        onChangeStationList(stationList);
    }, [stationList, onChangeStationList]);
    /**加载完数据后初始化部分参数 */
    useEffect(() => {
        // initialized==>>是否初始化，在useEffect请求接口后设置initialized为true，然后这里判断
        // initialized为true就执行初始化操作，完成后设置initialized为false,以后不在执行这里的代码
        // 不管这里用到的state作为依赖怎么变化，initialized为false这里的代码就都不会再执行了
        console.log(allModelList);
        const getMapStationVeriResult = async () => {
            try {
                const time = dayjs(latestInitTime).valueOf() - 24 * 60 * 60 * 1000;
                const res = await apis.getMapStationVeriResult({
                    elem: currentElem,
                    // forcastHour: forcastHour,
                    forcastHour: "24",
                    moc: methodValue,
                    model: model,
                    // selectedInitTime: latestInitTime
                    selectedInitTime: dayjs(time).format("YYYY-MM-DD HH:mm:ss")
                });
                console.log(res);
                // onChangeStationList(res);
                setStationList(res);
            } catch (e) {
                console.log(e);
            }
        };
        if (initialized) {
            getMapStationVeriResult();
            // setInitialized(false);
        }
    }, [initialized, currentElem, forcastHour, latestInitTime, methodValue, model, allModelList]);
    /**选择检验内容 */
    const handleSelectContent = (content: contentItem) => {
        // getProductList(content);
        // getObsList(content);
        // getForcastHour(content);
        setCurrentElem(content.elem);
        // setContentText(content.des);
        const currentContent = aoiList.find((item) =>
            item.aoi.contents.some((element) => element.elem === content.elem)
        ) as aoiItem;
        const list = currentContent.moc.contents.filter((item) => !item.value.includes("is_correct"));
        console.log("list===========", list);
        setMethodList(list);
        // const currentMethod = currentContent.moc.contents.find((element) => element.value === currentMethodValue);
        // // console.log("currentMethod===>>>", currentMethod);
        // if (!currentMethod) {
        //     const firstMethod = currentContent.moc.contents[0];
        //     setCurrentMethodValue(firstMethod.value);
        //     setMethodText(firstMethod.des);
        //     getRainVeriTypeList(firstMethod);
        // } else {
        //     getRainVeriTypeList(currentMethod);
        // }
    };
    return (
        <>
            {/* 检验要素 */}
            <div className={style.airportVerification}>
                <div className={style.airportOperater}>
                    {veriContentList.map((item) => (
                        <div
                            className={`${style.airportBtn} ${item.elem === currentElem ? style.active : ""}`}
                            key={item.elem}
                            onClick={() => handleSelectContent(item)}
                        >
                            <img style={item.style} src={item.src} alt="icon" />
                            {item.elem === "RAIN1" && <span className={style.num}>1</span>}
                        </div>
                    ))}
                </div>
                <div className={style.desc}>
                    {veriContentList.map((item) => (
                        <div className={style.descItem} key={item.elem}>
                            <span>{item.des}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* 检验方法 */}
            <div className={style.methods}>
                {methodList.map((item) => (
                    <div
                        className={`${style.methodsItem} ${methodValue === item.value ? style.active : ""}`}
                        key={item.des}
                        onClick={() => setMethodValue(item.value)}
                    >
                        {item.value}
                    </div>
                ))}
            </div>
            {/* 选择模式 */}
            <div
                className={style.select}
                onClick={() => setIsShowModelSelect((isShowModelSelect) => !isShowModelSelect)}
            >
                <div className={style.label}>{model}</div>
                <img className={style.arrow} src={icon_arrow_down} alt="" />
                {isShowModelSelect && (
                    <ul className={style.options}>
                        {modelList.map((item) => (
                            <li
                                className={style.optionsItem}
                                key={item.value}
                                onClick={(e) => handleSelectModel(e, item)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* 起报时间 */}
            <div className={style.select3}>
                <img src={icon_date} alt="" />
                <div className={style.time2}>{latestInitTime}</div>
            </div>
            {/* 选择时效间隔 */}
            <div
                className={`${style.select} ${style.select2}`}
                onClick={() => setIsShowForcastHourSelect((isShowForcastHourSelect) => !isShowForcastHourSelect)}
            >
                <div className={style.label}>{forcastHour}</div>
                <img className={style.arrow} src={icon_arrow_down} alt="" />
                {isShowForcastHourSelect && (
                    <ul className={style.options}>
                        {modelForcastHourList.map((item) => (
                            <li
                                className={style.optionsItem}
                                key={item.value}
                                onClick={(e) => handleSelectForcastHour(e, item)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* 时间轴 */}
            <div className={style.axis}>
                <div className={style.btn}>
                    <img src={icon_retreat} alt="" />
                </div>
                <div className={style.btn}>
                    <img src={icon_forward} alt="" />
                </div>
                <div className={`${style.btn} ${style.active2}`}>
                    <img className="play-pause" src={icon_pause} alt="" />
                </div>
                <div className={style.lineContainer}>
                    <div className={style.line}></div>
                    <div className={style.blueline}></div>
                    <div className={style.tickContainer}>
                        {tickList.map((item) => (
                            <div className={item.big ? style.big : style.small} key={item.id}>
                                {item.time && <div className={style.time}>{item.time}</div>}
                                {item.day && <div className={style.day}>{item.day}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
