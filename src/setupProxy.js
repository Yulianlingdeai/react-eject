const { createProxyMiddleware } = require("http-proxy-middleware");
console.log(process.env.REACT_APP_BASE_API);

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            // target: "http://192.168.0.18:10024/",
            target: "http://47.105.148.202:10024/",
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            },
            ws: true
        })
    );
};
