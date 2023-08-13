import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import type { regionResultItem } from "../../typings";

type props = {
    basicData: {
        models: string[];
    };
    echartsData: regionResultItem[];
};
export default function EchartComponent({ echartsData, basicData }: props) {
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    useEffect(() => {
        if (chartInstance) {
            chartInstance.clear();
        } else {
            // 获取图表容器 DOM 元素
            const chartContainer = document.getElementById("chart-container");
            // 初始化 ECharts 实例
            const chart = echarts.init(chartContainer);
            setChartInstance(chart);
        }
        console.log("echartsData===>>>>>", echartsData);
        const xAxisData = echartsData.map((item) => item.time);
        const seriesData = basicData.models.map((model) => {
            return {
                name: "温度",
                type: "line",
                data: echartsData.map((item) => {
                    const data = item.modelData.find((element) => element.modelName === model);
                    return data?.value1;
                })
            };
        });
        // 配置图表选项
        const options = {
            // 在这里配置你的图表选项
            title: {
                text: "2023-02-01～2023-02-02 08时次 24H预报 地面2m温度 平均误差（单位：°C）",
                textStyle: {
                    fontSize: 18,
                    fontWeight: "bold"
                    // left: "center"
                    // textAlign: "center" // 让标题居中
                },
                padding: 22,
                left: "center"
            },
            grid: {
                show: false,
                top: 67,
                left: 30,
                right: 30,
                bottom: 20,
                containLabel: true
            },
            tooltip: {
                trigger: "axis"
            },
            xAxis: {
                type: "category",
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#000"
                    }
                },
                data: xAxisData
            },
            yAxis: {
                type: "value",
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#000"
                    }
                }
            },
            series: seriesData
        };

        // 使用配置项渲染图表
        if (chartInstance) {
            chartInstance.setOption(options);
        }
        return () => {
            if (chartInstance) {
                chartInstance.clear();
            }
        };
    }, [echartsData, chartInstance, basicData]);
    return <div id="chart-container" style={{ width: "100%", height: "521px" }}></div>;
}
