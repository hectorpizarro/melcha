const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: [
    "webpack-hot-middleware/client",
    "react-hot-loader/patch",
    "./src/client/index.js",
  ],
  output: {
    path: path.join(__dirname, "..", "..", "/dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|txt|json)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
  mode: process.env.NODE_ENV || "development",
  devtool: "inline-source-map",
};
