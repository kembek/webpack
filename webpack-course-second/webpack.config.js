const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const isStats = process.env.STATS === 'stats';

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

const babelOptionsFactory = (preset) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties']
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

module.exports = {
  mode: 'development',
  entry: { main: ['./src/polyfill.js', './src/index.js'], analytics: './src/analytics.ts', mainReact: './src/index.jsx' },
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
    }),
    isStats && new BundleAnalyzerPlugin()
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptionsFactory()
          },
          isDev && 'eslint-loader'
        ].filter(Boolean)
      },
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptionsFactory('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptionsFactory('@babel/preset-react')
        }
      },
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
  },
  devtool: isDev && 'source-map'
};
