const {ModuleFederationPlugin} = require('webpack').container
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

const registerBundleLib = require('../util/webpack-config-util').registerBundleLib;

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    entry: "./index.js",
    mode: "development",
    devtool:"hidden-source-map",
    output: {
        publicPath: "http://localhost:3002/",
        clean:true
    },
    resolve:{
      alias: {
        // 路径别名
        src: resolve('src'),
        public: resolve('src/public'),
        home: resolve('src/home'),  
      },
        extensions: ['.jsx', '.tsx', '.js', '.json','.css','.scss','.jpg','jpeg','png',],
      },
    module: {
        rules: [
          {
            test:/\.(jpg|png|gif|jpeg)$/,
            loader:'url-loader'
          },
          {
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            options: {
              presets: ["@babel/preset-react"],
            },
          },
          {
            test: /\.tsx?$/,
            exclude: /(node_modules)/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-react'],
                  cacheDirectory: true, // 启用缓存
                },
              },
              {
                loader: 'ts-loader',
                options: {
                  happyPackMode: true, // 必须开启 否则 tread-loader会报错
                },
              }
            ],
          },
          {
            test: /\.less$/i,
            exclude: /(node_modules)/,
            use: [
              {
                loader: 'style-loader', // style-loader 就是将处理好的 css 通过 style 标签的形式添加到页面上
              },
              {
                // 打包css
                loader: 'css-loader',
              },
              {
                // 打包less
                loader: 'less-loader',
              },
              {
                loader: 'postcss-loader', // 安装 npm install postcss postcss-loader postcss-preset-env -D
              },
            ],
          },
        ],
      },
    plugins: [
        new ModuleFederationPlugin({
            name: "main_app",
            remotes:{
              ...registerBundleLib('base-lib-bundle', 'http://localhost:3004/index.js', ['react',  'react-dom/client', 'react-dom',]),
                "component-app":"component_app@http://localhost:3001/remoteEntry.js",
            },
        }),
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
        
    ],
};

