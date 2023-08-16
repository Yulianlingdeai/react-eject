import axios from "axios";
import request from "../utils/request";
import type { configKeys, aoiItem, regionItem, modelListItem, obsListItem } from "../typings";
type configParams = {
    REGION: {
        [key in configKeys]: aoiItem;
    } & { des?: string };
    STATION: {
        [key in configKeys]: aoiItem;
    } & { des?: string };
};
type regionList = {
    customRegionInfo: regionItem[];
    fixedRegionInfo: regionItem[];
};
export default {
    /**
     * 获取机场检验设置
     * @returns
     */
    async getAirportVerificationConfig() {
        return await axios.get("/airportConfig.json");
    },
    /**
     * 获取对应功能模块的检验参数
     * @param params
     * @returns
     */
    async getVeriConfigParamsByFuncKey(params: { keyName: string }) {
        return await request.get<any, configParams>("/kj-verification/api/system/config/getVeriConfigParamsByFuncKey", {
            params
        });
    },
    /**
     * 根据选择模式（产品）查询区域
     * @param params
     * @returns
     */
    async getRegionListByModels(params: any) {
        return await request.get<any, regionList>("/kj-verification/api/system/config/getRegionListByModels", {
            params
        });
    },
    /**
     * 获取模式配置列表
     * @returns
     */
    async getModelList() {
        return await request.get<any, modelListItem[]>("/kj-verification/api/system/config/getModelList");
    },
    /**
     * 获取实况配置列表数据
     * @returns
     */
    async getObsConfigList() {
        return await request.get<any, obsListItem[]>("/kj-verification/api/system/config/getObsConfigList");
    }
};
