


const javascript_excution_context = () => {
    /* 
      执行上下文：
        记录代码运行运行时环境的抽象概念
        三种执行上下文： 全局执行上下文、函数执行上下文、eval执行上下文

      执行栈：
        管理执行期间所有执行上下文的数据结构，也就是js程序的调用栈
        程序开始时会创建一个全局执行上下文（GlobalContext）压入栈中，之后每当有函数调用就创建一个函数执行上下文压入栈中。
      
      执行上下文的创建：
        创建词法环境LexicalEnvironment
            由两个部分组成：
            1.环境记录EnvironmentRecord：存放变量和函数声明的地方
                代码中声明的变量和函数都会存放在EnvironmentRecord中等待执行时访问。

            2.外层引用outer：提供了访问父词法环境的引用，可能为null

            词法环境的类型：
            1.全局环境(GlobalEnvironment)：
                在JavaScript代码运行伊始，宿主(浏览器、NodeJs等)会事先初始化全局环境，
                在全局环境的EnvironmentRecord中会绑定内置的全局对象(Infinity等)或全局函数(eval、parseInt等)，
                其他声明的全局变量或函数也会存储在全局词法环境中。全局环境的outer引用为null
            2.模块环境(ModuleEnvironment)：
                比如在nodejs中，在模块环境中你可以读取到export、module等变量，
                这些变量都是记录在模块环境的ER中。模块环境的outer引用指向全局环境。
            3.函数环境(FunctionEnvironment)：
                每一次调用函数时都会产生函数环境，在函数环境中会涉及this的绑定或super的调用。在ER中也会记录该函数的length和arguments属性。
                函数环境的outer引用指向调起该函数的父环境。在函数体内声明的变量或函数则记录在函数环境中。


            词法环境建立了 标识符->变量 的映射表 (标识符指的是变量名称或函数名, 变量则是实际变量原始值或者对象/函数的引用地址)

        创建变量环境VariableEnvironment
            在ES6前，声明变量都是通过var关键词声明的，在ES6中则提倡使用let和const来声明变量，为了兼容var的写法，于是使用变量环境来存储var声明的变量
            变量环境本质上仍是词法环境，但它只存储var声明的变量，这样在初始化变量时可以赋值为undefined。

            let/const声明的变量是归属于LexicalEnvironment，而var声明的变量归属于VariableEnvironment。
            let/const在初始化时会被置为<uninitialized>标志位，在没有执行到let xxx 或 let xxx = ???（赋值行）的具体行时，提前读取变量会报ReferenceError的错误。（这个特性又叫暂时性死区）
            var在初始化时先被赋值为undefined，即使没有执行到赋值行，仍可以读取var变量(undefined)

            当遇到Block或CaseBlock时，将会新建一个环境记录，在块中声明的let/const变量、函数、类都存放这个新的环境记录中，这些变量与块强绑定，在块外界则无法读取这些声明的变量

            什么是Block？ 被花括号({})括起来的就是块。
            在Block中的let/const变量仅在块中有效，块外界无法读取到块内变量。var变量不受此限制。

    */
}





const test_function = () => {
    
    // 立即执行的函数表达式(IIFE)的函数名称跟内部变量名称重名后，函数名称优先，因为函数名称是不可改变的，内部会静默失败，在严格模式下会报错
    (function a () {
        a = 2;
        console.log(a);
    })();

}


const this_function = () => {
    /*
        call()、apply() 和 bind() 用于改变函数执行时的 this 上下文。
        call() 和 apply() 用于立即调用函数，并设置函数执行时的 this 值。它们之间的区别在于参数传递方式：call() 通过参数列表传递，apply() 通过参数数组传递。
        bind() 方法不会立即调用函数。而是返回一个新的函数，新函数的 this 值被绑定到指定的对象，在调用新函数时，传入的参数将依次传递给原函数。
        greet.call(obj, 'Hello')
        greet.apply(obj, ['Hello']); 
        const boundGreet = greet.bind(obj);
    */

}



/*


*/