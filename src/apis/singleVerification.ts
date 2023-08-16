import request from "../utils/request";
import type { modelInfo, stationItem } from "../typings";

export default {
    /**
     * 根据模式和检验要素查询最新的起报时间和时效间隔
     * @param params
     * @returns
     */
    async getModelInfoByModelKey(params: { elem: string; modelKey: string }) {
        return await request.get<any, modelInfo>("/kj-verification/api/station/veri/getModelInfoByModelKey", {
            params
        });
    },
    /**
     * 获取地图机场站点检验结果数据
     * @param data
     * @returns
     */
    async getMapStationVeriResult(data: {
        elem: string;
        forcastHour: string;
        moc: string;
        model: string;
        selectedInitTime: string;
    }) {
        return await request.post<any, stationItem[]>(
            "/kj-verification/api/station/veri/getMapStationVeriResult",
            data
        );
    }
};
