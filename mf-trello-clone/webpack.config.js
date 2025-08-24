// HtmlWebpackPlugin: tự động inject script bundle vào index.html.
// DefinePlugin: định nghĩa biến môi trường để sử dụng trong code.
// ModuleFederationPlugin được import ở đây, nhưng config chi tiết sẽ tách riêng ở federation.config.js.


const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const federationConfig = require("./federation.config");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto", // để module federation tự resolve URL bundle
    clean: true, // xoá dist mỗi lần build
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true, // hỗ trợ react-router SPA
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new ModuleFederationPlugin(federationConfig), 
  ],
};
