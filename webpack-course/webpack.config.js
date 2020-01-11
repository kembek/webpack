const HtmlWebpackPlugin = require("HtmlWebpackPlugin");
const webpack = require("webpack");

module.exports = env => {
  const { mode } = env;

  return {
    mode,
    output: {
      filename: "bundle.js"
    },
    plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
  };
};
