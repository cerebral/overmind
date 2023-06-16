const { merge } = require('webpack-merge')
const base = require('./webpack.config.js')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(base, {
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
})
