const path = require("path");
require("@babel/polyfill");

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /(\.css|\.scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|gif|jp?eg|svg)/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
};
