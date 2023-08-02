import React, { useEffect } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";

export default function MapComponent() {
    useEffect(() => {
        // 创建一个 OpenLayers 地图
        const map = new Map({
            target: "map", // 地图容器 div 的 ID
            view: new View({
                center: fromLonLat([116.3974, 39.9093]), // 北京坐标
                zoom: 4 // 初始缩放级别
            })
        });

        // 添加高德地图瓦片图层
        const amapLayer = new TileLayer({
            source: new XYZ({
                url: "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}", // 高德地图瓦片 URL
                maxZoom: 18, // 高德地图支持的最大缩放级别
                tilePixelRatio: 2, // 可选：适用于 retina 显示屏
                attributions: '© <a href="http://www.amap.com/">高德地图</a>' // 地图的属性信息
            })
        });

        // 将图层添加到地图中
        map.addLayer(amapLayer);
        console.log("创建了一个地图实例");
        return () => {
            map.setTarget();
        };
    }, []);

    return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
}
