import React from "react";
import { Button, ConfigProvider } from "antd";
import style from "./index.module.css";

import icon_download_pic from "../../assets/image/icon_download_pic.svg";
import icon_download_table from "../../assets/image/icon_download_table.svg";
import icon_switch_echart from "../../assets/image/icon_switch_echart.svg";

export default function OperateButton() {
    return (
        <div className={style.echartTop}>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: "#4DAEF2",
                            algorithm: true
                        }
                    }
                }}
            >
                <Button className={`${style.button} ${style.buttonGap}`} type="primary">
                    <img className={style.downloadPic} src={icon_download_pic} alt="" />
                    <span className={style.buttonText}>下载图片</span>
                </Button>
            </ConfigProvider>
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: "#2FC25B",
                            algorithm: true
                        }
                    }
                }}
            >
                <Button className={style.button} type="primary">
                    <img src={icon_download_table} alt="" />
                    <span className={style.buttonText}>下载表格</span>
                </Button>
            </ConfigProvider>
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
                <Button className={`${style.button} ${style.switch}`} type="primary">
                    <img src={icon_switch_echart} alt="" />
                    <span className={style.buttonText}>切换柱状图</span>
                </Button>
            </ConfigProvider>
        </div>
    );
}
