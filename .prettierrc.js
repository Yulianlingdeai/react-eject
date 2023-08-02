module.exports = {
    printWidth: 100, // 每行代码的最大长度
    tabWidth: 4, // 缩进的空格数
    useTabs: false, // 是否使用制表符进行缩进
    semi: true, // 是否在语句末尾添加分号
    singleQuote: false, // 是否使用单引号
    quoteProps: "as-needed", // 对象属性是否使用引号
    jsxSingleQuote: false, // 在 JSX 中是否使用单引号
    trailingComma: "none", // 多行时尾随逗号的样式
    bracketSpacing: true, // 对象字面量中的括号是否有空格
    jsxBracketSameLine: false, // 将 JSX 的闭合标签放在最后一行的末尾
    arrowParens: "always", // 箭头函数参数是否添加括号
    rangeStart: 0, // 只格式化文件的一部分（从指定的行开始）
    rangeEnd: Infinity, // 只格式化文件的一部分（到指定的行结束）
    proseWrap: "preserve", // 控制 Markdown 文件换行方式
    htmlWhitespaceSensitivity: "css", // 控制 HTML 文件中空白符的敏感度
    endOfLine: "auto", // 控制换行符的样式
};
