import React from "react";
import { Button, ConfigProvider } from "antd";
import style from "./index.module.css";

import icon_download_pic from "../../assets/image/icon_download_pic.svg";
import icon_download_table from "../../assets/image/icon_download_table.svg";
import icon_switch_echart from "../../assets/image/icon_switch_echart.svg";
import icon_line from "../../assets/image/icon_line.svg";
import icon_line_inner from "../../assets/image/icon_line_inner.svg";

type props = {
    onClickDownloadTable: () => void;
    type: string;
    onClickSwitchEchartType: (type: string) => void;
    onClickDownloadPicture: () => void;
};
export default function OperateButton({
    onClickDownloadTable,
    type,
    onClickSwitchEchartType,
    onClickDownloadPicture
}: props) {
    const handleSwitchEchartType = () => {
        onClickSwitchEchartType(type === "line" ? "bar" : "line");
    };
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
                <Button
                    onClick={onClickDownloadPicture}
                    className={`${style.button} ${style.buttonGap}`}
                    type="primary"
                >
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
                <Button onClick={onClickDownloadTable} className={style.button} type="primary">
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
                <Button onClick={handleSwitchEchartType} className={`${style.button} ${style.switch}`} type="primary">
                    <img src={type === "line" ? icon_switch_echart : icon_line} alt="" />
                    {type !== "line" && <img className={style.lineInner} src={icon_line_inner} alt="" />}
                    <span className={style.buttonText}>{type === "line" ? "切换柱状图" : "切换曲线图"}</span>
                </Button>
            </ConfigProvider>
        </div>
    );
}
