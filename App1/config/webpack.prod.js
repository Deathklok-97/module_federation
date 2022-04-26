const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: { 
    about: './src/about/index.js' 
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
    publicPath: 'http://localhost:9002/'
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
        filename: 'about.html',
        title: 'about',
        description: 'some Description2',
        template: 'src/page-template.hbs',
    }),
    new ModuleFederationPlugin({
      name: 'AboutApp',
      filename: 'remoteEntry.js',
      exposes: {
        './AboutPage': './src/about/index'
      }
    })
  ]
}