import * as rollup from 'rollup';
import json from '@rollup/plugin-json';
import {terser} from 'rollup-plugin-terser'; // 生产环境代码压缩
import bundleReplace from '../plugins/replace.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url'
import resolve from '@rollup/plugin-node-resolve'; // rollup 并不支持直接打包 node-modules 里面的内容，所以需要安装 rollup-plugin-node-resolve 插件
import commonjs from '@rollup/plugin-commonjs' // 默认lodash没有被打包是因为它使用commonjs, rollup默认情况下只会处理es module 
import babel from '@rollup/plugin-babel'; //
const yargs = require('yargs/yargs');

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

function watch() {
    const watcher = rollup.watch(watchOptions);
    watcher.on('event', event => {
        // console.log('监听事件:')
        // console.log(event)
        /**
            event.code can be one of:
            START        —  监听启动
            BUNDLE_START —  构建一个独立的 bundle
                            * event.input 参数是inputOptions(如果存在)
                            * event.output 包含 file 或 dir 属性的数组 
            BUNDLE_END   —  一个bundle 构建结束
                            * event.input 参数是inputOptions(如果存在)
                            * event.output 包含 file 或 dir 属性的数组 [ '/Users/sunyangkai/代码基地/rollup/dist/bundle.js' ],
                            * event.duration 构建时间
                            * event.result 包含 bundle 对象。 bundle对象可以使用bundle.generate()或者bundle.write添加额外的输出 
                            * 当watch.skipWrite 选项开启时,这个属性会很重要。 
                            * 当bundle.generate()或者bundle.write()完成时，应该调用event.result.close()
                            * 如果没有调用bundle.generate()或者bundle.write()，event.result.close()会通知插件（plugins）清除相关资源（resources）
            END          — 所有 bundle都构建结束
            ERROR        — 构建 bundle 时报错
                            * event.error 包含抛出的错误
                            * event.result is null for build errors and contains the
                            bundle object for output generation errors. As with
                            "BUNDLE_END", you should call "event.result.close()" if
                            present once you are done.
            If you return a Promise from your event handler, Rollup will wait until the
            Promise is resolved before continuing.
         */
      });
      
      // This will make sure that bundles are properly closed after each run
      watcher.on('event', ({ result }) => {
        if (result) {
            result.close();
        }
      });
      
      // Additionally, you can hook into the following. Again, return a Promise to
      // make Rollup wait at that stage:
      watcher.on('change', (id, { event }) => {
        console.log('文件被修改:', id, event)
      })
      watcher.on('restart', () => { /* a new run was triggered */ })
      watcher.on('close', () => {
        console.log('监听关闭')
      })
      // 停止监听
    //   watcher.close()
}
watch();
