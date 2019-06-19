const path = require('path')

module.exports = (env) => ({
  devtool: 'inline-source-map',
  target: 'node',
  mode: 'development',
  entry: path.resolve('src', 'extension.ts'),
  output: {
    path: path.resolve('dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  devServer: {
    disableHostCheck: true,
  },
  externals: {
    vscode: 'commonjs vscode',
    bufferutil: 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-typescript', '@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-proposal-object-rest-spread'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
})
