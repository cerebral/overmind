const merge = require('webpack-merge')
const base = require('./webpack.config.js')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(base, {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
})
