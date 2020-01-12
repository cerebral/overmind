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
      disableHostCheck: true,
      proxy: {
        '/backend': 'http://localhost:5000',
      },
      historyApiFallback: true,
      hot: true,
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
          loader: 'babel-loader',
          include: path.join(__dirname, 'src'),
          options: {
            presets: [
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  jsxPragma: 'createElement',
                  allExtensions: true,
                },
              ],
              [
                '@babel/preset-react',
                {
                  pragma: 'createElement',
                },
              ],
              [
                '@babel/preset-env',
                { exclude: ['@babel/plugin-transform-classes'] },
              ],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-syntax-dynamic-import',
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                },
              ],
            ],
          },
        },
        {
          test: /\.tsx/,
          include: /node_modules/,
          loader: 'react-hot-loader/webpack',
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
