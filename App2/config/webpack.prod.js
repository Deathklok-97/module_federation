const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: {
    home: './src/home/index.js'
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
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                presets: [ '@babel/env', '@babel/preset-react'],
                plugins: [ '@babel/plugin-proposal-class-properties' ]
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
    publicPath: 'http://localhost:9001/'
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
        filename: 'home.html',
        title: 'hello world',        
        description: 'some Description',
        template: 'src/page-template.hbs',
    }),
    new ModuleFederationPlugin({
      name: 'HomeApp',
      filename: 'remoteEntry.js',
      exposes: {
        './HomePage': './src/home/components/my-button.js'
      }
    })
    
  ]
}