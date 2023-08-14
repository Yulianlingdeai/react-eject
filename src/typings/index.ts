export type configKeys = "AT" | "LH" | "LN" | "RAIN" | "VIS" | "WD" | "WS";

export type contentItem = {
    des: string; // "2米气温";
    elem: string; // "AT";
    forcastHour: string; // "3,6,9,12,24";
    model_array: string; // "T1279,T1279_TEST1,T1279_TEST2,EC,NCEP";
    obs_array: string; // "HTB,AWS,FOREIGN";
    pressType: string; // "SURF";
    pressValue: string; // "0";
    sort: number; // 1;
};

export type methodItem = {
    des: string; // "平均偏差";
    sort: number; // 1;
    ins_type?: string; // "Y"
    value: string; // "me";
};

export type aoiItem = {
    aoi: {
        contents: contentItem[];
        des: string;
    };
    moc: {
        contents: methodItem[];
        des: string;
    };
    des: string;
    sort: number;
};

export type regionItem = {
    latScope: string; // "mask";
    lonScope: string; // "mask";
    regionId: number; // 1001;
    regionName: string; // "中国区";
};

export type regionResultItem = {
    modelData:
        | ""
        | ({
              //   modelName: string; // "EC";
              [key in `value${number}`]: string | number; // "";
              //   value1: string | number; // 0.79;
              //   value2: string | number; // "";
              //   value3: string | number; // "";
              //   value4: string | number; // "";
              //   value5: string | number; // "";
              //   value6: string | number; // "";
          } & {
              modelName: string; // "EC";
              value?: string | number;
          })[];
    time: string;
};

export type modelListItem = {
    forcastHour: string; // "";
    id: number; // 1;
    maxLat: number; // 90;
    maxLon: number; // 359;
    minLat: number; // -90;
    minLon: number; // 0;
    modelKey: string; // "T1279";
    modelName: string; // "T1279";
    regionIds: string; // "1001,1002";
};

export type obsListItem = {
    id: number; // 1;
    obsKey: string; // "HTB";
    obsName: string; // "常规地面观测数据(绘图报)";
};

export type basicData = {
    models: string[];
    analyseType: number;
    title: string;
    type: string;
};
