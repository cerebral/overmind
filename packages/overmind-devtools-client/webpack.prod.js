const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// Remove the HtmlWebpackPlugin from base config
const basePlugins = base.plugins.filter(
  (plugin) => !(plugin instanceof HtmlWebpackPlugin)
)

module.exports = merge(
  {
    ...base,
    plugins: basePlugins,
  },
  {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          terserOptions: {
            sourceMap: true,
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Overmind Devtools',
        template: './index.html',
        templateParameters: {
          PORT: '',
        },
      }),
    ],
  }
)
