const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: {
    about: './src/about/index.js' 
  },
  mode: "development",
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
              'style-loader', 'css-loader', {
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
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
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
        title: 'about hello world',
        chunks: ['about'],
        description: 'some Description',
        template: 'src/page-template.hbs',
    }),
    new ModuleFederationPlugin({
      name: 'AboutApp',
      filename: 'remoteEntry.js',
      exposes: {
        './AboutPage': './src/about/index'
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../dist/"),
    index: 'about.html',
    port: 9002
  }
}