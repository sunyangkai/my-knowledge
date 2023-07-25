
const webpack = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require('mini-css-extract-plugin') // 通过 CSS 文件的形式引入到页面上

const path = require('path');
const registerBundleLib = require('../util/webpack-config-util').registerBundleLib;
function resolve(dir) {
  return path.join(__dirname, dir)
}

const args = process.argv.slice(2); 


const isRemote = process.env.npm_lifecycle_event === 'start';



const plugins = [
  new HtmlWebpackPlugin({
    title: '知识库',
    template: "./public/index.html",
  })
];
if (isRemote) {
  plugins.unshift(new ModuleFederationPlugin({
    name: "component_app",
    filename: "remoteEntry.js",
    remotes:{
      ...registerBundleLib('base-lib-bundle', 'http://localhost:3004/index.js', ['react', 'react-dom']),
    },
    exposes: {
      "./ecnomic": "./src/ecnomic/index",
      "./hooks": "./src/hooks/index",
      "./react": './src/react/index',
      "./reserch": './src/reserch/index'
    }
  }))
}

module.exports = {
    entry: "./index.js",
    mode: "development",
    devtool:"hidden-source-map",
    output: isRemote ? {
      path: path.join(__dirname, '/dist'), //打包后的文件存放的地方
      filename: '[name].[hash:8].js', //打包后输出文件的文件名
      publicPath: 'http://localhost:3001/', // 暴露出去的应用可访问路径
    } : {
      publicPath: "http://localhost:3001/",
      clean:true
    },
    resolve:{
      alias: {
        // 路径别名
        src: resolve('src'),
        public: resolve('src/public'),
        home: resolve('src/home'),  
      },
        extensions: ['.jsx','.tsx', '.js', '.json','.css','.scss','.jpg','jpeg','png',],
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
    plugins,
    devServer: {
      port: 3001,
      hot: true,
    },
};