import request from "../utils/request";
import type { regionResultItem } from "../typings";

export default {
    /**
     * 获取区域检验统计结果数据
     * @param data
     * @returns
     */
    getRegionVeriResult(data: any) {
        return request.post<any, regionResultItem[]>("/kj-verification/api/region/veri/getRegionVeriResult", data);
    }
};
