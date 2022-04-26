const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: { 
    home: './src/home/index.js' 
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
    publicPath: 'http://localhost:9001/'
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
        filename: 'home.html',
        title: 'hello world',
        chunks: ['home'],
        description: 'some Description',
        template: 'src/page-template.hbs',
    }),
    new ModuleFederationPlugin({
      name: 'HomeApp',
      filename: 'remoteEntry.js',
      exposes: {
        './HomePage': './src/home/components/my-button'
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../dist/"),
    index: 'home.html',
    port: 9001
  }
}