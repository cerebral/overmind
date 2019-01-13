const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env, args) => {
  const isProduction = args.mode === 'production'
  return {
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    optimization: Object.assign(
      {
        splitChunks: {
          chunks: 'all',
        },
      },
      isProduction && {
        minimizer: [
          (compiler) => {
            const TerserPlugin = require('terser-webpack-plugin')
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: true,
              terserOptions: {
                safari10: true,
              },
            }).apply(compiler)
          },
        ],
      }
    ),
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
}
