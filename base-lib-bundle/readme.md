1. 什么是 rollup?
Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。轻量、快速、体积小，tree-shaking.
在 rollup 中，可将文件编译为 UMD 或 CommonJS 格式

1.rollup 使用 ES6 标准格式打包代码
2.只打包 js ，打包速度快，打包生成的包体积小
3.在处理纯代码上具有算法优势，适用于开发 js 库，当然打包应用开发也可使用

rollup 是不推荐使用的:
需要代码拆分(Code Splitting)，rollup 不支持 Code Splitting(现版本已经支持)
很多静态资源需要处理，复杂模块化
构建的项目需要引入很多 CommonJS 模块的依赖


命令行: 
浏览器 - rollup main.js --format iife --name "myBundle" --file bundle.js
Node.js - rollup main.js --format cjs --file bundle.js
浏览器 & Node.js - rollup main.js --format umd --file bundle.js




