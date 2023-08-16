import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import Point from "ol/geom/Point";
// import Feature from "ol/Feature";
// import { Icon } from "ol/style";
import type { stationItem } from "../../typings";

type props = { stationList: stationItem[] };
export default function MapComponent({ stationList }: props) {
    const mapRef = useRef<null | HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>(null);
    useEffect(() => {
        // 创建一个 OpenLayers 地图
        const initialMap = new Map({
            target: mapRef.current as HTMLDivElement, // 地图容器 div 的 ID
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
        initialMap.addLayer(amapLayer);
        setMap(initialMap);
        return () => {
            initialMap.setTarget();
        };
    }, []);
    useEffect(() => {
        if (stationList.length) {
            if (!map) return;
            // console.log("添加站点", stationList);
            // const clickedCoord = event.coordinate;

            // const iconFeature = new Feature({
            //     geometry: new Point(clickedCoord)
            // });

            // const iconLayer = new VectorLayer({
            //     source: new VectorSource({
            //         features: [iconFeature]
            //     }),
            //     style: new Icon({
            //         src: "path/to/your/icon.png", // 用你自己的图标路径
            //         scale: 0.5
            //     })
            // });

            // map.addLayer(iconLayer);
        }
    }, [stationList, map]);

    return <div id="map" ref={mapRef} style={{ width: "100vw", height: "100vh" }}></div>;
}
