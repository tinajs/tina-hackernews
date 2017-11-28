import { resolve } from 'path'
import webpack from 'webpack'
import MinaEntryPlugin from '@tinajs/mina-entry-webpack-plugin'
import MinaRuntimePlugin from '@tinajs/mina-runtime-webpack-plugin'

export default {
  context: resolve('src'),
  entry: './app.mina',
  output: {
    path: resolve('dist'),
    filename: '[name]',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.mina$/,
        exclude: /node_modules/,
        use: [{
          loader: '@tinajs/mina-loader',
          options: {
            loaders: {
              js: 'babel-loader',
              wxss: {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: resolve('./postcss.config.js'),
                  },
                },
              },
            },
          },
        }],
      },
      {
        test: /\.png$/,
        use: {
          loader: "file-loader",
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
    new MinaEntryPlugin({
      map: (entry) => ['es6-promise/dist/es6-promise.auto.js', entry],
    }),
    new MinaRuntimePlugin({
      runtime: './common.js',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common.js',
    }),
  ],
}
