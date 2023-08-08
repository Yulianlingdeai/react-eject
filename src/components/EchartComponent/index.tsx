import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function EchartComponent() {
    useEffect(() => {
        // 获取图表容器 DOM 元素
        const chartContainer = document.getElementById("chart-container");
        // 初始化 ECharts 实例
        const chart = echarts.init(chartContainer);
        const data = {
            categories: ["06:00", "12:00", "18:00", "00:00", "06:00", "12:00", "18:00", "00:00", "06:00", "12:00"],
            seriesData: [120, 200, 150, 80, 70, 110, 130, 110, 50, 50]
        };
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
                data: data.categories
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
            series: [
                {
                    name: "温度",
                    type: "line",
                    data: data.seriesData
                }
            ]
        };

        // 使用配置项渲染图表
        chart.setOption(options);

        // 在组件卸载时销毁图表实例
        return () => {
            chart.dispose();
        };
    }, []);
    return <div id="chart-container" style={{ width: "100%", height: "521px" }}></div>;
}
