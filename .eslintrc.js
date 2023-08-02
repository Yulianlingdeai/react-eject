module.exports = {
    root: true, // 根目录下的所有文件都将受到 ESLint 规则的约束
    env: {
        browser: true, // 设置环境为浏览器环境
        node: true, // 设置环境为 Node.js 环境
        es6: true // 设置环境为 ES6+ 环境
    },
    extends: [
        "eslint:recommended", // 使用 ESLint 推荐的规则
        "plugin:react/recommended", // 使用 React 相关的规则
        "plugin:@typescript-eslint/recommended", // 使用@typescript-eslint/recommended规则
        // "prettier/@typescript-eslint", // 启用与Prettier的TypeScript解析器配合使用的规则,"prettier/@typescript-eslint" has been merged into "prettier" in eslint-config-prettier 8.0.0.
        "plugin:react-hooks/recommended", // 使用 React Hooks 相关的规则
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser", // 使用@typescript-eslint/parser解析器解析TypeScript代码
    parserOptions: {
        ecmaFeatures: {
            jsx: true // 启用 JSX 语法支持
        },
        ecmaVersion: 2021, // 设置使用的 ECMAScript 版本
        sourceType: "module" // 使用 ECMAScript 模块
    },
    plugins: [
        "react", // 使用 React 插件
        "react-hooks" // 使用 React Hooks 插件
        // "react-app",
        // "react-app/jest",
    ],
    rules: {
        // 在这里可以添加你的自定义规则
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": 0
    }
    // settings: {
    //     react: {
    //         version: "detect", // 自动检测 React 版本
    //     },
    // },
};
