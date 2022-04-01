require('dotenv').config();
const PreactRefreshPlugin = require('@prefresh/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
  const development = argv.mode !== 'production';

  const developmentPlugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      chunks: ['devWork'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'embed.html',
      chunks: ['devEmbed'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new PreactRefreshPlugin(),
  ];

  const extraPlugins = development ? developmentPlugins : [];

  const entries = development
    ? {
        embed: path.resolve(__dirname, 'src', 'embed.js'),
        devWork: path.resolve(__dirname, 'src', 'devWork.js'),
        devEmbed: path.resolve(__dirname, 'src', 'devEmbed.js'),
        widget: path.resolve(__dirname, 'src', 'widget.js'),
      }
    : {
        embed: path.resolve(__dirname, 'src', 'embed.js'),
        widget: path.resolve(__dirname, 'src', 'widget.js'),
      };

  return {
    target: 'browserslist',
    entry: entries,
    output: {
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.DEV_PARTNER_ID': JSON.stringify(
          process.env.DEV_PARTNER_ID,
        ),
        'process.env.DATA_URL': JSON.stringify(process.env.DATA_URL),
        'process.env.WIDGET_URL': JSON.stringify(process.env.WIDGET_URL),
        'process.env.DEV_WIDGET_URL': JSON.stringify(
          process.env.DEV_WIDGET_URL,
        ),
      }),
      new CleanWebpackPlugin(),
      ...extraPlugins,
    ],
    devServer: {
      hot: true,
    },
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '__ANTOURAGE__-[hash:base64:6]',
                },
              },
            },
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  };
};
