const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: {
    dashboard: './src/dashboard.js'
  },
  mode: "production",
  optimization: {
    splitChunks: {
        chunks: 'all',
        //minsize: 3000
    }
  },
  module: {
      rules: [
        {
          test: /\.(png|jpg)$/,
          type: 'asset',
          parser:{
              dataUrlCondition: {
                  maxSize: 3*1024 //3 kilobytes
              }
          }
        },
        {
          test: /\.scss$/,
          use: [
              MiniCssExtractPlugin.loader, 'css-loader', {
                loader: 'sass-loader',
                options: {
                  // Prefer `dart-sass`
                  implementation: require("sass"),
                },
              } 
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                presets: [ '@babel/env', '@babel/preset-react'],
              }
          }
        },
        {
          test: /\.hbs$/,
          use: [
            'handlebars-loader'
          ]
        }
    ]
  },
  output: {
    filename: "[name].[contenthash:5].js",
    path: path.resolve(__dirname, "../dist/"),
    publicPath: 'http://localhost:9000/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:5].css',
    }),
    new CleanWebpackPlugin(
    //   {
    //     cleanOnceBeforeBuildPatterns: [
    //       '**/*',
    //       path.join(process.cwd(), 'build/**/*')
    //   ]
    // }
    ),
    new HtmlWebpackPlugin({
        filename: 'dashboard.html',
        title: 'Dashboard',
    }),
    new ModuleFederationPlugin({
        name: 'App',
        remotes: {
          HomeApp: 'HomeApp@http://localhost:9001/remoteEntry.js',
          AboutApp: 'AboutApp@http://localhost:9002/remoteEntry.js'
        }
    })
  ]
}