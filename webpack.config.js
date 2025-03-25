const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/scripts/index.js' // index.js находится в папке src
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'production', // или 'development', если нужно
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/ // исключаем node_modules как регулярное выражение
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Поскольку ваш index.html лежит в src, используем этот путь
      template: './src/index.html',
      minify: false // Отключаем минификацию шаблона, чтобы избежать ошибок
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};