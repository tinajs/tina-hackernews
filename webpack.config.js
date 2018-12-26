const { resolve } = require('path')
const webpack = require('webpack')
const MinaEntryPlugin = require('@tinajs/mina-entry-webpack-plugin')
const MinaRuntimePlugin = require('@tinajs/mina-runtime-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const loaders = {
  script: 'babel-loader',
  style: {
    loader: 'postcss-loader',
    options: {
      config: {
        path: resolve('./postcss.config.js'),
      },
    },
  },
}

module.exports = {
  context: resolve('src'),
  entry: './app.mina',
  output: {
    path: resolve('dist'),
    filename: '[name]',
    publicPath: '/',
    globalObject: 'wx',
  },
  module: {
    rules: [
      {
        test: /\.mina$/,
        exclude: /node_modules/,
        use: [
          {
            loader: '@tinajs/mina-loader',
            options: {
              loaders,
            },
          },
        ],
      },
      {
        test: /\.mina$/,
        include: /node_modules/,
        use: '@tinajs/mina-loader',
      },
      {
        test: /\.js$/,
        include: [
          resolve('src'),
          resolve('node_modules/p-timeout'),
          resolve('node_modules/p-queue'),
        ],
        use: loaders.script,
      },
      {
        test: /\.(css|wxss)$/,
        exclude: /node_modules/,
        use: loaders.style,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash:6].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    symlinks: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new MinaEntryPlugin(),
    new MinaRuntimePlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common.js',
      minChunks: 2,
      minSize: 0,
    },
    runtimeChunk: {
      name: 'runtime.js',
    },
  },
  mode: isProduction ? 'production' : 'none',
}
