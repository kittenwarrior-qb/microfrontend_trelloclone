const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map", // dễ debug
  devServer: {
    port: 3003,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    historyApiFallback: true,
  },
  output: {
    filename: "[name].js",
  },
});
