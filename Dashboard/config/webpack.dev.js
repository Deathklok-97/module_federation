const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: {
    dashboard: './src/dashboard.js'
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
    publicPath: 'http://localhost:9000/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist/"),
    index: 'dashboard.html',
    port: 9000,
    historyApiFallback: {
        index: 'dashboard.html'
    }
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
  ],
}