
import * as rollup from 'rollup';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser'; // 生产环境代码压缩
import bundleReplace from './plugins/replace.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url'
import resolve from '@rollup/plugin-node-resolve'; // rollup 并不支持直接打包 node-modules 里面的内容，所以需要安装 rollup-plugin-node-resolve 插件
import commonjs from '@rollup/plugin-commonjs' // 默认lodash没有被打包是因为它使用commonjs, rollup默认情况下只会处理es module 
import babel from '@rollup/plugin-babel'; //

// 有关选项的详细信息，请参见下文
const inputOptions = {
    input: 'main.js',
    cache: true, // 该选项用于指定先前的 bundle 的缓存。当它设置后，Rollup 只会对改变的部分进行重新分析，从而加速观察模式（watch mode）中的后续构建
    onwarn (warning, warn) { // 该选项用于拦截警告消息
        // 忽略指定类型的警告
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
    
        // 抛出其他类型错误
        if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message);

        if (warning.loc) { // 很多警告还具有 loc 和 frame 属性，它们可以用来定位警告来源。
            console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
            if (warning.frame) console.warn(frame);
          } else {
            console.warn(message);
          }
    
        // 使用默认处理函数兜底
        warn(warning);
    },
    plugins: [json(), resolve(), babel({ babelHelpers: 'bundled' }), commonjs()],
	external: ['jquery'], // 排除公共第三方插件，不打包进输出文件，通过CDN引入
};

const outputOptions = {
    file: 'dist/bundle.js',
    format: 'system',
    globals: {
      jquery: '$44'
    },
    paths: {
      jquery: 'http://code.jquery.com/jquery-1.11.0.min.js', // 外部依赖是指该选项 无法解析 的模块或者通过 external 选项明确指定的模块。output.paths 提供的路径会取代模块 ID，在生成的 bundle 中使用
    },
    assetFileNames: '[name]-[hash].[ext]', // 于自定义构建结果中的静态文件名称
    banner: '/*this is banner*/', // 该选项用于在 bundle 顶部添加一个字符串，或者在构建结果末尾添加一个字符串
    footer: '/*this is footer*/', 
};

async function build() {
  // 参数为inputOptions， 返回Promise.reslove(bundle)。这个函数会构建模块依赖图，treeshaking。但是还没有生成输出文件。
  const bundle = await rollup.rollup(inputOptions);
  await generateOutputs(bundle);
  // 或者将bundle写入磁盘
  await bundle.write(outputOptions);
}

async function generateOutputs(bundle) {
    console.log(bundle.watchFiles); // 该 bundle 依赖的文件名数组
    const res = await bundle.generate(outputOptions)
    const { output } = res;
    for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
          // 对于assets，包含
          // {
          //   fileName: string,              // asset 文件名
          //   source: string | Uint8Array    // asset 资源
          //   type: 'asset'                  // 表示这是一个 asset
          // }
          console.log('Asset', chunkOrAsset);
        } else {
          // 对于chunks, 包含
          // {
          //   code: string,                  // 生成的JS代码
          //   dynamicImports: string[],      // chunk 动态导入的外部模块
          //   exports: string[],             // 导出的变量名
          //   facadeModuleId: string | null, // 该chunk对应的模块的ID
          //   fileName: string,              // chunk的文件名
          //   imports: string[],             // chunk 静态导入的外部模块
          //   isDynamicEntry: boolean,       // 该 chunk 是否是动态入口点
          //   isEntry: boolean,              // 该 chunk 是否是静态入口点
          //   map: string | null,            // sourcemaps(如果存在)
          //   modules: {                     // 此 chunk 中模块的信息
          //     [id: string]: {
          //       renderedExports: string[]; // 导出的已包含变量名
          //       removedExports: string[];  // 导出的已删除变量名
          //       renderedLength: number;    // 模块中剩余代码的长度
          //       originalLength: number;    // 模块中代码的原始长度
          //     };
          //   },
          //   name: string                   // 命名模式中使用的 chunk 的名称
          //   type: 'chunk',                 // 表示这是一个chunk
          // }
          console.log('Chunk', chunkOrAsset.modules);
        }
      }
}
build();
