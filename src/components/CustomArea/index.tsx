import React, { ChangeEvent, useState } from "react";
import { Drawer, Button, Input, ConfigProvider, Popover, Modal } from "antd";
import style from "./index.module.css";
import CustomCloseIcon from "../CustomCloseIcon";

import icon_custom_add from "../../assets/image/icon_custom_add.svg";
import icon_path from "../../assets/image/icon_path.svg";
import icon_search from "../../assets/image/icon_search.png";
import icon_input_prefix from "../../assets/image/icon_input_prefix.svg";
import icon_eyes from "../../assets/image/icon_eyes.svg";
import icon_detail from "../../assets/image/icon_detail.svg";
import icon_close from "../../assets/image/icon_close.svg";

const area = [
    { id: 1, label: "海上区域", checked: false },
    { id: 2, label: "东一区", checked: true },
    { id: 3, label: "西四区", checked: true },
    { id: 4, label: "东一区", checked: false },
    { id: 5, label: "西四区", checked: false },
    { id: 6, label: "东一区", checked: false },
    { id: 7, label: "海上区域", checked: false }
    // { id: 8, label: "海上区域", checked: false },
    // { id: 9, label: "海上区域", checked: false }
];
const location = [
    { id: 1, label: "开始点位", longitude: 0, latitude: 111 },
    { id: 2, label: "结束点位", longitude: 0, latitude: 123 }
];
type areaItem = { id: number; label: string; checked: boolean };
export default function CustomArea({ open, onClose }: any) {
    const [areaName, setAreaName] = useState("");
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [currentPopoverId, setCurrentPopoverId] = useState(0);
    const [areaList, setAreaList] = useState<areaItem[]>(area);
    const [isShowDetailModal, setIsShowDetailModal] = useState(false);
    const [isShowAddAreaModal, setIsShowAddAreaModal] = useState(false);
    const handleChangeAreaName = (e: ChangeEvent<HTMLInputElement>) => {
        setAreaName(e.target.value);
    };
    const handleChangeChecked = (item: any) => {
        setAreaList(
            areaList.map((element) => {
                if (element.id === item.id) {
                    element.checked = !element.checked;
                }
                return element;
            })
        );
    };
    const handlePopoverOpenChange = (visible: boolean, item: any) => {
        setPopoverOpen(visible);
        setCurrentPopoverId(item.id);
    };
    const handleClosePopoverOpen = () => {
        setPopoverOpen(false);
    };
    /**关闭新增区域modal */
    const handleCloseAddAreaModal = () => {
        setIsShowAddAreaModal(false);
    };
    return (
        <>
            <Modal
                width={320}
                title={<div className={style.modalHeader}>区域详情</div>}
                centered
                maskClosable={false}
                className="detailModal"
                mask={false}
                footer={null}
                open={isShowDetailModal}
                onCancel={() => setIsShowDetailModal(false)}
                closeIcon={<img width={13} height={13} src={icon_close} alt="" />}
            >
                <div className={style.detailName}>
                    <span className={style.detailLabel}>名称：</span>
                    <span className={style.areaname}>东一区</span>
                </div>
                <div className={style.detailHeader}>
                    <div>位置</div>
                    <div>经度</div>
                    <div>纬度</div>
                </div>
                <div className={style.detailContent}>
                    {location.map((item) => (
                        <div className={`${style.detailHeader} ${style.detailItem}`} key={item.id}>
                            <div>{item.label}</div>
                            <div>{item.longitude}</div>
                            <div>{item.latitude}</div>
                        </div>
                    ))}
                </div>
            </Modal>
            <Modal
                width={560}
                title={
                    <div className={style.addModalHeader}>
                        添加自定义区域
                        <CustomCloseIcon
                            onClick={handleCloseAddAreaModal}
                            className={style.closeIcon}
                        ></CustomCloseIcon>
                    </div>
                }
                centered
                maskClosable={false}
                className="addAreaModal"
                mask={false}
                footer={null}
                open={isShowAddAreaModal}
                onCancel={handleCloseAddAreaModal}
                closeIcon={false}
            >
                <div className={style.addAreaName}>
                    <span className={style.addAreaLabel}>名称：</span>
                    <Input
                        className={style.addAreaInput}
                        value={areaName}
                        onChange={handleChangeAreaName}
                        placeholder="请输入名称"
                    />
                </div>
                <div className={style.addAreaHeader}>
                    <div className={style.locationLabel}>位置</div>
                    <div className={style.position}>经度</div>
                    <div className={style.position}>纬度</div>
                </div>
                <div className={style.detailContent}>
                    {location.map((item) => (
                        <div className={`${style.addAreaHeader} ${style.addAreaItem}`} key={item.id}>
                            <div className={style.locationLabel}>{item.label}</div>
                            <div className={style.position}>
                                <input type="text" />°
                                <input type="text" />′
                                <input type="text" />″
                            </div>
                            <div className={style.position}>
                                <input type="text" />°
                                <input type="text" />′
                                <input type="text" />″
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.addAreaFooter}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: "#1C7BBE",
                                    algorithm: true
                                }
                            }
                        }}
                    >
                        <Button onClick={handleCloseAddAreaModal} className={style.addAreaButton} type="primary">
                            取消
                        </Button>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: "#D39422",
                                    algorithm: true
                                }
                            }
                        }}
                    >
                        <Button
                            onClick={handleCloseAddAreaModal}
                            className={`${style.addAreaButton} ${style.marginLeft10}`}
                            type="primary"
                        >
                            确定
                        </Button>
                    </ConfigProvider>
                </div>
            </Modal>
            <Drawer
                rootClassName="drawerContainer"
                width={300}
                title={null}
                placement="left"
                mask={false}
                closable={false}
                onClose={onClose}
                open={open}
            >
                <div className={style.operateButton}>
                    <Button className={style.customAdd} onClick={() => setIsShowAddAreaModal(true)}>
                        <img width={30} height={30} style={{ verticalAlign: "top" }} src={icon_custom_add} alt="" />
                        手动添加
                    </Button>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: "#0096FF",
                                    algorithm: true
                                }
                            }
                        }}
                    >
                        <Button className={style.button} type="primary">
                            <img width={30} height={30} style={{ verticalAlign: "top" }} src={icon_path} alt="" />
                            地图拾取
                        </Button>
                    </ConfigProvider>
                </div>
                <div className={style.areaSearch}>
                    <div className={style.inputPrefix}>
                        <img src={icon_input_prefix} alt="" />
                    </div>
                    <Input
                        className={style.input}
                        value={areaName}
                        onChange={handleChangeAreaName}
                        placeholder="请输入名称"
                        suffix={<img width={16} height={16} src={icon_search} alt="" />}
                    />
                </div>
                <div className={style.table}>
                    <div className={style.tableHeader}>
                        <div className={style.tableHeaderItem}>序号</div>
                        <div className={`${style.tableHeaderItem} ${style.name}`}>名称</div>
                        <div className={style.tableHeaderItem}>操作</div>
                    </div>
                    <div className={style.tableContainer}>
                        {areaList.map((item) => (
                            <div className={style.tableItem} key={item.id}>
                                <div className={`${style.tableHeaderItem} ${style.tableCell}`}>
                                    {item.checked ? (
                                        <img
                                            onClick={() => handleChangeChecked(item)}
                                            className={style.checked}
                                            width={20}
                                            height={15}
                                            src={icon_eyes}
                                            alt=""
                                        />
                                    ) : (
                                        <div
                                            onClick={() => handleChangeChecked(item)}
                                            className={style.unchecked}
                                        ></div>
                                    )}
                                    <div>{item.id}</div>
                                </div>
                                <div className={`${style.tableHeaderItem} ${style.name} ${style.tableCell}`}>
                                    {item.label}
                                </div>
                                <div className={`${style.tableHeaderItem} ${style.tableCell}`}>
                                    <img
                                        width={20}
                                        height={20}
                                        style={{ cursor: "pointer" }}
                                        src={icon_detail}
                                        alt=""
                                        onClick={() => setIsShowDetailModal(true)}
                                    />
                                    <div className={style.delete} onClick={() => handlePopoverOpenChange(true, item)}>
                                        <img width={10} height={10} src={icon_close} alt="" />
                                    </div>
                                    {currentPopoverId === item.id && (
                                        <Popover
                                            placement="rightTop"
                                            title="确定删除该区域吗？"
                                            open={popoverOpen}
                                            arrow={false}
                                            rootClassName="area-operate"
                                            trigger="click"
                                            content={
                                                <div className={style.poppverFooter}>
                                                    <Button
                                                        onClick={() => handlePopoverOpenChange(false, item)}
                                                        className={style.cancel}
                                                    >
                                                        取消
                                                    </Button>
                                                    <ConfigProvider
                                                        theme={{
                                                            components: {
                                                                Button: {
                                                                    colorPrimary: "#FA5151",
                                                                    algorithm: true
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={handleClosePopoverOpen}
                                                            className={style.confirm}
                                                            type="primary"
                                                        >
                                                            删除
                                                        </Button>
                                                    </ConfigProvider>
                                                </div>
                                            }
                                        >
                                            {""}
                                        </Popover>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </>
    );
}
