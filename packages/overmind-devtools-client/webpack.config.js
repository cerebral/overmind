const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

// Get port from environment variable
const port = process.env.OV_DEV_PORT || 3031

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: path.resolve('src', 'index.tsx'),
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  devServer: {
    allowedHosts: 'all',
    webSocketServer: false,
    hot: false,
    liveReload: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    client: {
      overlay: false,
      logging: 'warn',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        include: path.resolve('src'),
        options: {
          presets: [
            [
              '@babel/preset-typescript',
              {
                isTSX: true,
                allExtensions: true,
              },
            ],
            ['@babel/preset-react'],
            '@babel/preset-env',
          ],
          plugins: [
            '@babel/plugin-transform-class-properties',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      {
        test: /\.(woff2)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Overmind Devtools',
      template: './index.html',
      templateParameters: {
        PORT: port,
      },
    }),
  ],
}
