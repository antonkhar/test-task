const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
    }
};

module.exports = ({develop}) => ({
  mode: develop ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
          filename: './styles/main.css'
      }),
      new CopyPlugin({
        patterns: [
            { from: './src/PHPMailer', to: 'PHPMailer' },
            { from: './src/send.php', to: 'send.php' },
            { from: './src/images/burger-open.png', to: 'burger-open.png' },
            { from: './src/images/burger-close.png', to: 'burger-close.png' },
        ],
      }),
  ],
  module: {
      rules: [
          {
              test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
              type: 'asset/inline'
          },
          {
              test: /\.html$/i,
              loader: 'html-loader'
          },
          {
              test: /\.css$/i,
              use: [
                MiniCssExtractPlugin.loader, 'css-loader'
              ]
          },
          {
              test: /\.scss$/i,
              use: [
                MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
              ]
          }
      ]
  },
  ...devServer(develop),
});