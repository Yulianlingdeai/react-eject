import request from "../utils/request";

export default {
    /**
     * 获取区域检验统计结果数据
     * @param data
     * @returns
     */
    getRegionVeriResult(data: any) {
        return request.post("/kj-verification/api/region/veri/getRegionVeriResult", data);
    }
};
