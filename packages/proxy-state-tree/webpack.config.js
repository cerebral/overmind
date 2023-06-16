const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve('./es/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'proxy-state-tree.min.js',
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          sourceMap: true,
          module: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve('src'),
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
}
