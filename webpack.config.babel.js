import dotenv from 'dotenv'
import path from 'path'
import { HotModuleReplacementPlugin } from 'webpack'

import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackTemplate from 'html-webpack-template'

dotenv.config()

export default {
  entry: './client/app',
  output: {
    path: path.join(__dirname, './public'),
    filename: 'js/main.[hash].js',
    pathinfo: false,
  },
  resolve: {
    modules: [
      path.resolve('./client'),
      path.resolve('./node_modules'),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HtmlWebpackTemplate,
      title: 'Daily Budget',
      cache: true,
      inject: false,
      appMountId: 'app',
      mobile: true,
      meta: {
        description: 'App for calculating your daily budget',
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: './client/assets/logo.svg',
      prefix: 'assets/',
      persistentCache: true,
      inject: true,
      background: '#fbd75d',
      title: 'Daily Budget',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [
        '/node_modules/',
        '/public/',
      ],
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      }],
      include: path.resolve('client'),
    }, {
      test: /\.(gif|png|jpe?g)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'raw-loader',
      }, {
        loader: 'svgo-loader',
        options: {
          plugins: [{
            removeTitle: true,
          }, {
            convertColors: {
              shorthex: false,
            },
          }, {
            convertPathData: false,
          }],
        },
      }],
    }],
  },
  devServer: {
    port: process.env.CLIENT_PORT,
    open: true,
    proxy: {
      '/api': `http://localhost:${process.env.SERVER_PORT}`,
    },
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false,
    },
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
}
