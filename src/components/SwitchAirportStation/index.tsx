import React, { useState } from "react";
import { Button, Popover, Space, Tag, Radio, Pagination } from "antd";
import type { RadioChangeEvent, PaginationProps } from "antd";
// import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.css";
import style from "./index.module.css";
import icon_ariport from "../../assets/image/icon_airport.svg";
import icon_close from "../../assets/image/icon_close.svg";
import SearchInput from "../SearchInput";

const stationList = [
    { label: "宣都", value: "57465" },
    { label: "海淀", value: "57461" },
    { label: "宣读", value: "57423" },
    { label: "宣读", value: "57409" },
    { label: "宣读", value: "57412" },
    { label: "宣读", value: "574213" },
    { label: "宣读", value: "574asd" },
    { label: "宣读", value: "574sf" },
    { label: "宣读", value: "574sdf" },
    { label: "宣读", value: "574gf" },
    { label: "宣读", value: "574in" },
    { label: "宣读", value: "574pj" },
    { label: "宣读", value: "574uu" }
];
export default function SwitchAirportStation({ className }: { className?: string }) {
    const [stationId, setStationId] = useState("");
    const [current, setCurrent] = useState(1);
    const [open, setOpen] = useState(false);
    const onChange = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value);
        setStationId(e.target.value);
    };
    const handleChangePagination: PaginationProps["onChange"] = (page) => {
        console.log(page);
        setCurrent(page);
    };
    const handleClosePopover = () => {
        setOpen(false);
    };
    const handleShowPopover = () => {
        setOpen(true);
    };
    const handleCloseStation = () => {};
    return (
        <Popover
            placement="bottomRight"
            title={null}
            open={open}
            trigger="click"
            content={
                <div className={style.popoverContainer}>
                    <div className={style.popoverHeader}>
                        <Button
                            type="primary"
                            style={{ background: "#d39422", marginRight: "8px" }}
                            className={style.container}
                        >
                            <img src={icon_ariport} alt="" />
                            <span className={style.buttonText}>空军机场</span>
                        </Button>
                        <Button type="primary" style={{ background: "#3F4D60" }} className={style.container}>
                            <img src={icon_ariport} alt="" />
                            <span className={style.buttonText}>明航机场</span>
                        </Button>
                        <div className={style.closeIcon} onClick={handleClosePopover}>
                            <img src={icon_close} alt="" />
                        </div>
                    </div>
                    <div className={style.searchContainer}>
                        <SearchInput className={style.searchInput} inputClassName={style.input}></SearchInput>
                    </div>
                    <div className={style.stationContainer}>
                        <div className={style.selectedStation}>
                            <span>当前选择的站点：</span>
                            <Space size={[0, 8]} wrap>
                                <Tag
                                    closeIcon={<img style={{ color: "#4DAEF2" }} src={icon_close} alt="" />}
                                    onClose={handleCloseStation}
                                >
                                    海淀(54399)
                                </Tag>
                            </Space>
                        </div>
                        <div className="stationRadio">
                            <Radio.Group onChange={onChange} value={stationId}>
                                {stationList.map((item) => (
                                    <Radio key={item.value} value={item.value}>
                                        {`${item.label}(${item.value})`}
                                    </Radio>
                                ))}
                            </Radio.Group>
                            <Pagination
                                className={style.pagination}
                                locale={{
                                    items_per_page: "条/页",
                                    jump_to: "跳至",
                                    page: "页",
                                    prev_page: "上一页",
                                    next_page: "下一页"
                                }}
                                showLessItems
                                showSizeChanger
                                showQuickJumper
                                current={current}
                                onChange={handleChangePagination}
                                showTotal={(total) => `共${total}条`}
                                defaultCurrent={1}
                                total={500}
                            />
                        </div>
                    </div>
                    <div className={style.footer}>
                        <Button
                            type="primary"
                            style={{ background: "#1C7BBE", marginRight: "8px" }}
                            className={style.container}
                            onClick={handleClosePopover}
                        >
                            <span className={style.text}>取消</span>
                        </Button>
                        <Button
                            type="primary"
                            style={{ background: "#D39422" }}
                            className={style.container}
                            onClick={handleClosePopover}
                        >
                            <span className={style.text}>确认</span>
                        </Button>
                    </div>
                </div>
            }
        >
            <Button
                onClick={handleShowPopover}
                type="primary"
                style={{ background: "#d39422" }}
                className={`${style.container} ${className}`}
            >
                <img src={icon_ariport} alt="" />
                <span className={style.buttonText}>切换机场</span>
            </Button>
        </Popover>
    );
}
