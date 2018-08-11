const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    proxy: {
      '/backend': 'http://localhost:5000',
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.md/,
        use: 'raw-loader',
      },
      {
        test: /\.(png|woff2)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: path.join(__dirname, 'src'),
        options: {
          allowTsInNodeModules: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'backend', 'index.html'),
    }),
  ],
}
