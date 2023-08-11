import request from "../utils/request";
import type { configKeys, aoiItem, regionItem } from "../typings";
type configParams = {
    REGION: {
        [key in configKeys]: aoiItem;
    } & { des?: string };
};
type regionList = {
    customRegionInfo: regionItem[];
    fixedRegionInfo: regionItem[];
};
export default {
    /**
     * 获取对应功能模块的检验参数
     * @param params
     * @returns
     */
    async getVeriConfigParamsByFuncKey(params: any) {
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
    }
};
