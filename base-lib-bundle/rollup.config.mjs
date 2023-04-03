import json from '@rollup/plugin-json';
import {terser} from 'rollup-plugin-terser'; // 生产环境代码压缩
import bundleReplace from './plugins/replace.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url'
import resolve from '@rollup/plugin-node-resolve'; // rollup 并不支持直接打包 node-modules 里面的内容，所以需要安装 rollup-plugin-node-resolve 插件
import commonjs from '@rollup/plugin-commonjs' // 默认lodash没有被打包是因为它使用commonjs, rollup默认情况下只会处理es module 
import babel from '@rollup/plugin-babel'; // 

// console.log(fileURLToPath(new URL('rollup.config.js', import.meta.url))) // 绝对路径

const packageJson = JSON.parse( // 解析json
	readFileSync(new URL('./package.json', import.meta.url))
);

/**
 * @type {import('rollup').RollupOptions}
 */

// 虽然配置文件提供了配置Rollup的简单方法，但它们也限制了如何调用和配置Rollup。
// 特别是如果您正在将Rollup绑定到另一个构建工具中，或者希望将其集成到高级构建过程中，那么最好直接从脚本中以编程方式调用Rollup。

export default {
	input: 'main.js',
	output: [
		{
		  file: 'dist/bundle.js',
		  format: 'umd',
		  globals: {
			jquery: '$44'
		  },
		  paths: {
			jquery: 'http://code.jquery.com/jquery-1.11.0.min.js', // 外部依赖是指该选项 无法解析 的模块或者通过 external 选项明确指定的模块。output.paths 提供的路径会取代模块 ID，在生成的 bundle 中使用
		  },
		  assetFileNames: '[name]-[hash].[ext]', // 于自定义构建结果中的静态文件名称
		  banner: '/*this is banner*/', // 该选项用于在 bundle 顶部添加一个字符串，或者在构建结果末尾添加一个字符串
		  footer: '/*this is footer*/', 
		},
		{
		  file: 'dist/bundle.min.js',
		  format: 'iife',
		  globals: {
			jquery: '$44' // 给第三方包全局命名
		  },
		  sourcemap: true,
		 // 并非每个插件都可以在这里使用。output.plugins仅限于使用在bundle.generate（）或bundle.write（）期间运行的钩子的插件，
		  // 即在Rollup的主分析完成之后。如果您是插件作者，请查看输出生成挂钩以了解可以使用哪些挂钩。
		  plugins: [terser()] 
		}
	  ],
	plugins: [json(), resolve(), babel({ babelHelpers: 'bundled' }), commonjs()],
	external: ['jquery'], // 排除公共第三方插件，不打包进输出文件，通过CDN引入
};


// 导出一个函数，函数的参数是命令行参数
// rollup --config --configDebug

// import defaultConfig from './rollup.default.config.js';
// import debugConfig from './rollup.debug.config.js';

// export default commandLineArgs => {
// 	if (commandLineArgs.configDebug === true) {
// 		return debugConfig;
// 	}
// 	return defaultConfig;
// };