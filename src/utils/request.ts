import axios from "axios";

const res = await axios.get("/config.json");

const request = axios.create({
    // baseURL: process.env.REACT_APP_BASE_API,
    baseURL: res.data.BASE_URL,
    timeout: 20000
});

request.interceptors.request.use(
    (config) => config,
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => {
        if (response.headers["content-type"].includes("application/octet-stream")) {
            return response;
        }
        const { code, data } = response.data;
        if (code && +code === 200) {
            return data;
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        console.log("err:====>>>>>>" + error); // for debug
        return Promise.reject(error);
    }
);

export default request;
