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
