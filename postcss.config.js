module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-preset-env": {
            browsers: ["last 2 versions", "> 0.2%"],
            stage: 3
        }
    }
};
