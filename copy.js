let CopyWebpackPlugin = require("copy-webpack-plugin");
let path = require("path");
// 处理内容
function optimize(str) {
  return str
    .replace(/.\/pages\/login.js/g, "");
}

new CopyWebpackPlugin({
    patterns: [
    {
        from: path.resolve(__dirname, "a"),
        to: path.resolve(__dirname, "b"),
        transform(content) {
        // 修改文件的内容
        return optimize(content.toString());
        },
    },
    ],
})
