const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { main: './src/index.js', analytics: './src/analytics.js' },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Webpack',
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|svg|gif)$/i, use: ['file-loader'] },
      { test: /\.(ttf|woff2?|eot)$/, use: ['file-loader'] },
      { test: /\.xml$/, use: 'xml-loader' },
      { test: /\.csv$/, use: 'csv-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    port: 4200,
    open: {
      app: ['google-chrome', '--incognito']
    }
  }
};
