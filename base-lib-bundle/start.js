#!/usr/bin/node

import * as rollup from 'rollup';
import json from '@rollup/plugin-json';
import {terser} from 'rollup-plugin-terser'; // 生产环境代码压缩
import bundleReplace from './plugins/replace.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url'
import resolve from '@rollup/plugin-node-resolve'; // rollup 并不支持直接打包 node-modules 里面的内容，所以需要安装 rollup-plugin-node-resolve 插件
import commonjs from '@rollup/plugin-commonjs' // 默认lodash没有被打包是因为它使用commonjs, rollup默认情况下只会处理es module 
import babel from '@rollup/plugin-babel'; //
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';

// 有关选项的详细信息，请参见下文
const inputOptions = {
    input:  {
      'index':'main.js',
      // 'routes': './home/router.tsx'
    },
    cache: true, // 该选项用于指定先前的 bundle 的缓存。当它设置后，Rollup 只会对改变的部分进行重新分析，从而加速观察模式（watch mode）中的后续构建
    // onwarn (warning, warn) { // 该选项用于拦截警告消息
    //     // 忽略指定类型的警告
    //     if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
    
    //     // 抛出其他类型错误
    //     if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message);

    //     if (warning.loc) { // 很多警告还具有 loc 和 frame 属性，它们可以用来定位警告来源。
    //         console.warn(`${warning.loc.file} (${warning.loc.line}:${warning.loc.column}) ${warning.message}`);
    //         if (warning.frame) console.warn(warning.frame);
    //       } else {
    //         console.warn(warning.message);
    //       }
    
    //     // 使用默认处理函数兜底
    //     warn(warning);
    // },
    plugins: [
      json(), 
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' ) // development || production
      }),
      typescript(), 
      postcss({ plugins: [] }),
      babel({ 
        babelHelpers: 'bundled', 
        presets: ['@babel/preset-react'],
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']
      }),
       commonjs()
    ],
};

const outputOptions = {
    dir: 'dist',
    format: 'umd',
    assetFileNames: '[name]-[hash].[ext]', // 于自定义构建结果中的静态文件名称
    sourcemap: true,
    name: 'base-lib-bundle',
    exports: 'named',
};



const watchOptions = {
    ...inputOptions,
    preserveEntrySignatures: "exports-only", //  "strict" | "allow-extension" | exports-only | false
    output: [outputOptions],
    watch: {
        buildDelay: 0, // Rollup 触发重新构建（rebuild）到执行进一步构建需要等待的时间（以毫秒为单位）
        // chokidar
        clearScreen: true, // 该选项用于决定在触发重建是是否清除屏幕。
        exclude: 'node_modules/**', // 指定不需要被 watch 的文件
        include: 'src/**', // 该选项用于限制只能对指定文件进行观察。请注意，该选项只过滤 module graph 中的文件，不在其中的文件将不会被观察
        skipWrite: false, // 该选项用于决定是否在触发重新构建时忽略
        context: 'window', // 模块的this指向，默认是undefined
    }
    // 详细说明：https://rollupjs.org/configuration-options/#preserveentrysignatures
    // strict: Rollup 将在入口 chunk 中创建与相应入口模块中完全相同的导出, 如果模块内部之间有重复导出，rollup会新建一个名为 main-50a71bb6.js的文件来存放必要的导出内容。 对于库，推荐使用此设置. 
    // allow-extension: 则 Rollup 会将在入口 chunk 中创建入口模块的所有导出。不管有没有重复导出。
    // "exports-only" : 入口模块有导出内容时，相当于strict。入口模块没导出时，相当于allow-extension
    // false: 不会将入口模块中的任何导出内容添加到相应的 chunk 中

};

// function watch() {
//     const watcher = rollup.watch(watchOptions);
//     watcher.on('event', event => {
//         if (event.code === 'ERROR') {
//           const { error } = event;
//           const { id, extract, line, index, column, plugin, parse } = error;
//           console.log(`rollup编译错误:${id}`)
//           console.log(error)
       
//         }
//         if (event.code === 'BUNDLE_START') {
//           console.log('构建bundle', 'input:'+event.input, 'output:' + event.output )
//         }
//         if (event.code === 'END') {
//           console.log("构建结束.")
//         }
//         /**
//             event.code can be one of:
//             START        —  监听启动
//             BUNDLE_START —  构建一个独立的 bundle
//                             * event.input 参数是inputOptions(如果存在)
//                             * event.output 包含 file 或 dir 属性的数组 
//             BUNDLE_END   —  一个bundle 构建结束
//                             * event.input 参数是inputOptions(如果存在)
//                             * event.output 包含 file 或 dir 属性的数组 [ '/Users/sunyangkai/代码基地/rollup/dist/bundle.js' ],
//                             * event.duration 构建时间
//                             * event.result 包含 bundle 对象。 bundle对象可以使用bundle.generate()或者bundle.write添加额外的输出 
//                             * 当watch.skipWrite 选项开启时,这个属性会很重要。 
//                             * 当bundle.generate()或者bundle.write()完成时，应该调用event.result.close()
//                             * 如果没有调用bundle.generate()或者bundle.write()，event.result.close()会通知插件（plugins）清除相关资源（resources）
//             END          — 所有 bundle都构建结束
//             ERROR        — 构建 bundle 时报错
//                             * event.error 包含抛出的错误
//                             * event.result is null for build errors and contains the
//                             bundle object for output generation errors. As with
//                             "BUNDLE_END", you should call "event.result.close()" if
//                             present once you are done.
//             If you return a Promise from your event handler, Rollup will wait until the
//             Promise is resolved before continuing.
//          */
//       });
      
//       // This will make sure that bundles are properly closed after each run
//       watcher.on('event', ({ result }) => {
//         if (result) {
//             result.close();
//         }
//       });
      
//       // Additionally, you can hook into the following. Again, return a Promise to
//       // make Rollup wait at that stage:
//       watcher.on('change', (id, { event }) => {
//         console.log('文件被修改:', id, event)
//       })
//       watcher.on('restart', () => { /* a new run was triggered */ })
//       watcher.on('close', () => {
//         console.log('监听关闭')
//       });
//       // 停止监听
//     //   watcher.close()
// }
// watch();


async function build() {
  // 参数为inputOptions， 返回Promise.reslove(bundle)。这个函数会构建模块依赖图，treeshaking。但是还没有生成输出文件。
  const bundle = await rollup.rollup(inputOptions);
  await generateOutputs(bundle);
  // 或者将bundle写入磁盘
  await bundle.write(outputOptions);
  console.log('构建结束')
}

async function generateOutputs(bundle) {
    // console.log(bundle.watchFiles); // 该 bundle 依赖的文件名数组
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
          // console.log('Asset', chunkOrAsset);
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
          // console.log('Chunk', chunkOrAsset.modules);
        }
      }
}
build();

