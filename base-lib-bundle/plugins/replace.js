const bundleReplace = () => {
    return {
      name: 'bundle-replace', // 名字用来展示在警告和报错中
      transform (bundle) { // 异步 对文件内容进行转换，如把 ts 编译为 js。就是 webpack 中 loader 的概念
        return bundle.replace('Amelia', 'Alice')
      },
      buildEnd() { // 异步 在所有模块及其依赖都已经解析完毕时回调，这时整个Graph(依赖图)图里的结点都已经处理完毕，下一步就可以输出 bundle 了。在这里可以拿到所有解析完毕的 module
        const moduleIds = this.getModuleIds();
        for(let id of moduleIds) {
            const module = this.getModuleInfo(id);
            // console.log(module)
        }
      },
      resolveId(source, importer, options) { // 修改模块id
        console.log(source, importer, options)
        if (source === 'main.js') {
            // this signals that rollup should not ask other plugins or check the file system to find this id
            console.log(source)
            return source;
          }
        return null; 
      },
      load(id) {
        console.log(id)
        // if (id === 'main.js') {
        //     console.log('the source code for "main.js"')
        //     return 'export default "This is virtual!"';
        // }
          return null; // other ids should be handled as usually
      },
      buildStart(options) { //异步 需要访问传递给rollup.rollup()的选项时建议使用的钩子
        // console.log(options)
      },
      closeWatcher() { // 通知插件观察程序进程何时关闭，以便所有打开的资源也可以关闭。如果返回Promise，Rollup将等待Promise解决，然后关闭进程。输出插件不能使用此钩子。
        console.log('进程关闭')
      },
      moduleParsed(moduleInfo) { // async  每个模块导入后都调用
        // console.log(moduleInfo)
      },
      options(options) { // 替换或操作传递给rollup.rollup的选项对象。返回null不会替换任何内容。如果您只需要读取选项，建议使用buildStart钩子
        // console.log(options)
      }
    };
  }

  export default bundleReplace;


// rollup.rollup 执行期间的构建钩子函数 - Build Hooks
// chunks.generator(write)执行期间的输出钩子函数 - Output Generation Hooks
// 监听文件变化并重新执行构建的 rollup.watch 执行期间的 watchChange 钩子函数

