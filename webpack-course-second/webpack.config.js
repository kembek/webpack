const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimizationFactory = (isProdMode) => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProdMode) {
    config.minimizer = [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()];
  }

  return config;
};

const getFilenamePattern = (isProdMode, ext = 'js') => (isProdMode ? `[name].[hash].${ext}` : `[name].${ext}`);

const getStyleLoader = (isProdMode, styleLoader) => {
  const config = [
    isProdMode
      ? {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          }
        }
      : 'style-loader',
    'css-loader'
  ];

  if (styleLoader) {
    config.push(styleLoader);
  }

  return config;
};

module.exports = {
  mode: 'development',
  entry: { main: './src/index.js', analytics: './src/analytics.js' },
  output: {
    filename: getFilenamePattern(isProd),
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'Webpack',
      template: path.resolve(__dirname, 'public/index.html'),
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: getFilenamePattern(isProd, 'css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: getStyleLoader(isProd)
      },
      {
        test: /\.less$/i,
        use: getStyleLoader(isProd, 'less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        use: getStyleLoader(isProd, 'sass-loader')
      },
      { test: /\.(png|jpe?g|svg|gif)$/i, use: ['file-loader'] },
      { test: /\.(ttf|woff2?|eot)$/i, use: ['file-loader'] },
      { test: /\.xml$/i, use: 'xml-loader' },
      { test: /\.csv$/i, use: 'csv-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimizationFactory(isProd),
  devServer: {
    port: 4200,
    hot: isDev,
    open: {
      app: ['google-chrome', '--incognito']
    }
  }
};
