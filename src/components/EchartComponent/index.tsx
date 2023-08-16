import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import type { regionResultItem, basicData } from "../../typings";
import { Button } from "antd";
import { handleAbnormalData } from "../../utils";
import style from "./index.module.css";

type props = {
    basicData: basicData;
    echartsData: regionResultItem[];
};
type rainButtonItem = {
    id: number;
    rainLevel: number;
    rainText: string;
};
const rainButtonList: rainButtonItem[] = [
    { id: 1, rainLevel: 1, rainText: "小雨" },
    { id: 2, rainLevel: 2, rainText: "中雨" },
    { id: 3, rainLevel: 3, rainText: "大雨" },
    { id: 4, rainLevel: 4, rainText: "暴雨" },
    { id: 5, rainLevel: 5, rainText: "大暴雨" },
    { id: 6, rainLevel: 6, rainText: "特大暴雨" }
];
const colorList = ["#00B578", "#07B9B9", "#3662EC"];
// const headData = ["2020", "2021", "2022", "2023", "2024", "2025"];
export default function EchartComponent({ echartsData, basicData }: props) {
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    const [rainLevel, setRainLevel] = useState(1);
    const [isShowEcharts, setShowEcharts] = useState(true);
    const [tableWidth, setTableWidth] = useState(0);
    const [tableData, setTableData] = useState<
        {
            model: string;
            rain: boolean;
            cellData: {
                key: string;
                data: {
                    key: string;
                    value: string | number | undefined;
                }[];
            }[];
        }[]
    >([]);
    const [headData, setHeadData] = useState<string[]>([]);
    useEffect(() => {
        const { models, title, analyseType, type, veriType, rain } = basicData;
        const xAxisData = echartsData.map((item) => (veriType === "ZR" ? item.time : `${item.time}H`));
        if (type === "table") {
            setShowEcharts(false);
            const list = models.map((model) => {
                return {
                    model: model,
                    rain: rain,
                    cellData: rain
                        ? rainButtonList.map((item) => {
                              return {
                                  key: item.rainText,
                                  data: echartsData.map((element, index) => {
                                      if (element.modelData) {
                                          const current = element.modelData.find(
                                              (modelItem) => modelItem.modelName === model
                                          );
                                          return {
                                              key: `${model}-${item.rainText}-${index}`,
                                              value: current
                                                  ? handleAbnormalData(current[`value${item.rainLevel}`])
                                                  : "NaN"
                                          };
                                      }
                                      return {
                                          key: `${model}-${item.rainText}-${index}`,
                                          value: "NaN"
                                      };
                                  })
                              };
                          })
                        : [1].map(() => {
                              return {
                                  key: model,
                                  data: echartsData.map((element, index) => {
                                      if (element.modelData) {
                                          const current = element.modelData.find(
                                              (modelItem) => modelItem.modelName === model
                                          );
                                          return {
                                              key: `${model}-${index}`,
                                              value: current ? handleAbnormalData(current.value) : "NaN"
                                          };
                                      }
                                      return {
                                          key: `${model}-${index}`,
                                          value: "NaN"
                                      };
                                  })
                              };
                          })
                };
            });
            setTableWidth(100 * xAxisData.length);
            setHeadData(xAxisData);
            setTableData(list);
        } else {
            setShowEcharts(true);
            if (chartInstance) {
                chartInstance.clear();
            } else if (echartsData.length) {
                // 获取图表容器 DOM 元素
                const chartContainer = document.getElementById("chart-container");
                // 初始化 ECharts 实例
                const chart = echarts.init(chartContainer);
                setChartInstance(chart);
            }
            console.log("echartsData===>>>>>", echartsData);

            const seriesData = models.map((model, index) => {
                return type === "line"
                    ? {
                          name: model,
                          type: type,
                          symbol: "circle", // 使用圆点
                          symbolSize: 6, // 设置圆点大小
                          color: colorList[index] || colorList[0],
                          connectNulls: true,
                          data: echartsData.map((item) => {
                              if (item.modelData) {
                                  const data = item.modelData.find((element) => element.modelName === model);
                                  if (data) {
                                      return analyseType === 2 ? data.value : data[`value${rainLevel}`];
                                  }
                              }
                              return null;
                          })
                      }
                    : {
                          name: model,
                          type: type,
                          barMaxWidth: 18,
                          color: colorList[index] || colorList[0],
                          data: echartsData.map((item) => {
                              if (item.modelData) {
                                  const data = item.modelData.find((element) => element.modelName === model);
                                  if (data) {
                                      return analyseType === 2 ? data.value : data[`value${rainLevel}`];
                                  }
                              }
                              return null;
                          })
                      };
            });
            // 配置图表选项
            const options = {
                // 在这里配置你的图表选项
                legend: {
                    show: true,
                    x: "left",
                    data: basicData.models,
                    padding: [90, 0, 0, 60],
                    textStyle: {
                        color: "rgba(0, 0, 0, 0.6)",
                        fontSize: "16px"
                    },
                    // selectedMode: true,
                    icon: "circle",
                    formatter: (params: any) => {
                        return params;
                    }
                },
                title: {
                    text: title,
                    textStyle: {
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "rgba(0, 0, 0, 0.8)"
                        // left: "center"
                        // textAlign: "center" // 让标题居中
                    },
                    padding: 22,
                    left: "center"
                },
                grid: {
                    show: false,
                    top: 125,
                    left: 38,
                    right: 50,
                    bottom: 56,
                    containLabel: true
                },
                tooltip: {
                    trigger: "axis"
                },
                xAxis: {
                    type: "category",
                    boundaryGap: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(0, 0, 0, 0.6)"
                        }
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true
                    },
                    data: xAxisData
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(0, 0, 0, 0.6)"
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "#D8D8D8"
                        }
                    }
                },
                series: seriesData
            };

            // 使用配置项渲染图表
            if (chartInstance) {
                chartInstance.setOption(options);
            }
        }
        return () => {
            if (chartInstance) {
                chartInstance.clear();
            }
        };
    }, [echartsData, chartInstance, basicData, rainLevel]);
    const handleChangeRainLevel = (item: rainButtonItem) => {
        setRainLevel(item.rainLevel);
    };
    return (
        <div id="chartBox" style={{ position: "relative" }}>
            <div
                id="chart-container"
                style={{ display: isShowEcharts ? "block" : "none", width: "100%", height: "521px" }}
            ></div>
            {basicData.analyseType !== 2 && isShowEcharts && (
                <div className={style.rainContainer}>
                    {rainButtonList.map((item) => (
                        <Button
                            onClick={() => handleChangeRainLevel(item)}
                            className={`${style.button} ${item.rainLevel === rainLevel ? style.active : ""}`}
                            key={item.id}
                            type="primary"
                        >
                            {item.rainText}
                        </Button>
                    ))}
                </div>
            )}
            {!isShowEcharts && (
                <div className={style.table}>
                    <div className={style.tableTitle}>{basicData.title}</div>
                    <div className={style.tableContainer}>
                        <div className={style.tableLeft} style={{ width: basicData.rain ? "200px" : "100px" }}>
                            <div className={style.blankBox}></div>
                            {tableData.map((item) => {
                                return item.rain ? (
                                    <div className={style.rainModel} key={item.model}>
                                        <div className={style.model}>{item.model}</div>
                                        <div className={style.rainText}>
                                            {item.cellData.map((element) => (
                                                <div key={element.key} className={style.cell}>
                                                    {element.key}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={style.normalModel} key={item.model}>
                                        {item.model}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={style.tableBox} style={{ width: basicData.rain ? "750px" : "850px" }}>
                            {/* width={tableWidth + "px"} */}
                            <table style={{ width: tableWidth + "px" }}>
                                <thead>
                                    <tr>
                                        {headData.map((item) => (
                                            <th key={item}>{item}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item) =>
                                        item.cellData.map((element) => (
                                            <tr key={element.key}>
                                                {element.data.map((cell) => (
                                                    <th key={cell.key}>{cell.value}</th>
                                                ))}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
