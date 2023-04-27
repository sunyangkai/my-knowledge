/*
    js代码粉异步代码和同步代码
    异步代码分：
        微任务：Promise、await、MutationObserver、process.nextTick（node)
        宏任务：用户交互事件，如 click、mousedown；网络请求、文件I/O 事件、定时器事件setTimeout、
    
    执行顺序：
     检测微任务队列，清空。
     执行宏任务队列中的第一个。如此反复。

*/

const task = () => {
        console.log('script start');
        setTimeout(function() { // 宏任务1
            console.log('setTimeout1');
            Promise.resolve().then(function() { // 微任务1
                console.log('promise1');
            });
        }, 0);

        setTimeout(function() { // 宏任务2
            console.log('setTimeout2');
            Promise.resolve().then(function() { // 微任务2
                console.log('promise2');
            });
        }, 0);

        Promise.resolve().then(function() { // 微任务3
            console.log('promise3');
            setTimeout(function() { // 宏任务3
                console.log('setTimeout3');
                Promise.resolve().then(function() { // 微任务4
                console.log('promise4');
                });
            }, 0);
        }).then(function() { // 微任务5
            console.log('promise5');
        });
        console.log('script end');
        // script start
        // excute.html:32 script end
        // excute.html:21 promise3
        // excute.html:29 promise5
        // excute.html:7 setTimeout1
        // excute.html:9 promise1
        // excute.html:14 setTimeout2
        // excute.html:16 promise2
        // excute.html:23 setTimeout3
        // excute.html:25 promise4

}



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


const javacript_prototype = () => {
    /**
        js 两种数据类型。
            基本数据类型：number, string, boolean, null, undefined, symbol, bigint
              存在栈内存中的。
              bigint：
                // 定义 BigInt 值
                整数值的范围不再受到 2 的 53 次方的限制，而可以表示任意大的整数。
                值必须以 n 结尾，例如 10n 表示一个 BigInt 值
                与 Number 类型的值不能混合运算。

                const a = 123456789012345678901234567890n;

                // BigInt 值的基本运算
                const b = a + 1n;
                const c = a * 2n;
                const d = a ** 3n;

            引用数据类型：
                Object：表示对象值，包括数组、函数、日期、正则表达式等。
              存在堆内存中的。
        
     */

    // 1.原始类型的变量在赋值或传参时是按值传递的，而引用类型的变量在赋值或传参时是按引用传递的
    function test1() {
        // 原始类型的变量是按值传递的
        let a = 10;
        let b = a;

        b = 20;

        console.log(a); // 10
        console.log(b); // 20

        // 引用类型的变量是按引用传递的
        let obj1 = { name: 'Tom' };
        let obj2 = obj1;

        obj2.name = 'Jerry';

        console.log(obj1.name); // Jerry
        console.log(obj2.name); // Jerry
    }

    // 2.值类型的数据是存储在栈内存中的，而引用类型的数据是存储在堆内存中的。
    // 当把一个值类型的数据赋值给一个变量时，JavaScript 引擎会把这个值复制到栈内存中，然后把变量指向这个栈内存地址。
    // 这意味着当改变变量的值时，实际上是改变了栈内存中存储的值，而不是改变原来的值。
    // 当把一个引用类型的数据赋值给一个变量时，JavaScript 引擎会把这个变量指向堆内存中存储该对象的内存地址，而不是把对象本身复制到变量中


    // 3.数据类型检测方法
     // typeof

     function typeof_test() {
        typeof 42; // "number"
        typeof true; // "boolean"
        typeof "hello"; // "string"
        typeof undefined; // "undefined"
        typeof Symbol(); // "symbol"
        typeof 9007199254740992n; // "bigint"
        typeof {}; // "object"


        typeof []; // "object"
        typeof new Date(); // "object"
        typeof /hello/; // "object"
        typeof new Map(); // "object"
        typeof new Set(); // "object"

        typeof function() {}; // "function"
        typeof null; // "object"

     }
     // instanceof
     // instanceof可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型
     function instanceof_test () {
        // object instanceof constructor
        class Animal {}
        class Dog extends Animal {}
        const animal = new Animal();
        const dog = new Dog();
        console.log(animal instanceof Animal); // true
        console.log(animal instanceof Dog); // false
        console.log(dog instanceof Animal); // true
        console.log(dog instanceof Dog); // true


        // instanceof只能正确判断引用数据类型，而不能判断基本数据类型
        console.log(2 instanceof Number);   
        // 2 是一个原始类型的数字值，不是 Number 类的实例          // false
        console.log(true instanceof Boolean);                // false 
        console.log('str' instanceof String);                // false 

        console.log([] instanceof Array);                    // true
        console.log(function(){} instanceof Function);       // true
        console.log({} instanceof Object);                   // true

     }

     // 当需要判断更多类型的时候，toString
     function to_string_test () {
        let a = 'hello';
        console.log(Object.prototype.toString.call(a)); // [object String]

        let b = 123;
        console.log(Object.prototype.toString.call(b)); // [object Number]

        let c = true;
        console.log(Object.prototype.toString.call(c)); // [object Boolean]

        let d = { name: 'Jack', age: 20 };
        console.log(Object.prototype.toString.call(d)); // [object Object]

        let e = [1, 2, 3];
        console.log(Object.prototype.toString.call(e)); // [object Array]

        let f = null;
        console.log(Object.prototype.toString.call(f)); // [object Null]

        let g = undefined;
        console.log(Object.prototype.toString.call(g)); // [object Undefined]

        let h = Symbol('key');
        console.log(Object.prototype.toString.call(h)); // [object Symbol]

        let i = function() {};
        console.log(Object.prototype.toString.call(i)); // [object Function]

     }





// 1.扩展阅读：js中的栈和堆
// 栈内存是一种后进先出（LIFO）的数据结构，它具有以下特点：

// 栈内存的空间很小，通常只有几十KB，因此存储的数据量比较有限。
// 栈内存中存储的数据是按照先进后出的顺序进行存储的。
// 栈内存的分配和释放是由编译器自动完成的，因此对程序员是透明的。
// 栈内存中存储的数据是不需要垃圾回收的，因为当函数执行完毕时，栈内存中的数据会自动被释放。
// 堆内存是一种动态分配的数据结构，它具有以下特点：

// 堆内存的空间比较大，通常几百MB或几GB，因此存储的数据量比较大。
// 堆内存中存储的数据是按照任意顺序进行存储的，没有特定的存储顺序。
// 堆内存的分配和释放是由程序员手动控制的，程序员需要在适当的时候手动释放不再使用的内存，否则会导致内存泄漏。
// 堆内存中存储的数据是需要垃圾回收的，因为程序员手动释放内存的时机可能不太准确，如果不及时回收垃圾数据，会导致内存溢出。


// 扩展阅读：内存泄漏
 const momoLeak = () => {


      // 1. 意外的全局变量
      // 没有使用 var、let 或 const 关键字定义变量，变量会变成全局变量，如果长期保留，会导致内存泄漏
        function createGlobalVariable() {
            myVariable = 'This is a global variable';
        }
        createGlobalVariable();
      

      // 2.闭包
      // 函数中定义了内部函数并返回
        function createClosure() {
            let count = 0;
            function increment() {
            count++;
            console.log(count);
            }
            return increment;
        }
  
     // 返回的函数形成闭包，如果长期被保留，会导致 count 变量无法被垃圾回收，从而导致内存泄漏
      let counter = createClosure();

      // 

     // 3.循环引用
     // 两个对象相互引用，形成循环引用
        let obj1 = {};
        let obj2 = {};
        obj1.ref = obj2;
        obj2.ref = obj1;
    // 这两个对象无法被垃圾回收，从而导致内存泄漏

        
        
      //4.定时器和回调函数
      //  果我们多次创建并销毁这个按钮元素，但没有删除对应的事件监听器，就可能导致内存泄漏的问题。因为事件监听器会一直存在于内存中，直到被删除或页面卸载。
      function handleClick() {
        console.log('Button clicked');
      }
      let btn = document.getElementById('myButton');
      btn.addEventListener('click', handleClick);
      
      // 在不再需要事件监听器的时候，及时删除它们，避免内存泄漏
      btn.removeEventListener('click', handleClick);
   
      // 5.当 DOM 元素被删除时，但是 JavaScript 对象仍然存在，就会发生内存泄漏
       let myDiv = document.getElementById('myDiv');
        // 从 DOM 中删除元素
        myDiv.parentNode.removeChild(myDiv);

        // 使用 DOM 元素
        // ...

        // 手动释放 DOM 引用
        myDiv = null;

 }

}

const javacript_es6 = () => {
    /*
        1.Symbol 用于创建独一无二的标识符，可以用作对象的属性名或方法名，避免了因命名冲突而产生的错误。
         可以用于对象的属性名、方法名、私有成员、常量、枚举类型等场景，从而提高程序的可读性、可维护性和安全性
        2.创建私有成员或常量：Symbol 可以用于创建私有成员或常量，通过将 Symbol 作为对象属性的 key，来防止属性被意外修改   
        3.作为枚举类型：Symbol 可以用于定义枚举类型，将不同的枚举值映射到不同的 Symbol 上，从而实现枚举类型的效果。
     */
    const name = Symbol('name')
    const symbole_obj = {
        name: 'Alice' // 避免name属性被意外修改
    }

    // 系统中或许存在很多个叫张三、李四的人。但在这里用Symbol声明一个独一无二的张三，避免命名重复
    // 如果不用Symbol，就需要业务前缀严格区分。这种情况在redux属性命名上很常见。
    const zhangsan = Symbol('zhangsan'); 
    const lisi = Symbol('lisi');



}


const test_function = () => {
    
    // 立即执行的函数表达式(IIFE)的函数名称跟内部变量名称重名后，函数名称优先，因为函数名称是不可改变的，内部会静默失败，在严格模式下会报错
    (function a () {
        a = 2;
        console.log(a);
    })();

}


const test_type_transfromation = () => {

    // JavaScript 的灵活性使得它适合用于编写动态和交互性的应用程序，因为这些应用程序通常需要快速响应用户的操作，并根据用户的行为动态地改变应用程序的行为和状态。
    // JavaScript 可以在运行时根据用户的输入和应用程序的状态来动态地修改变量的类型和值，从而实现这种灵活性。
    // 例如，一个网页应用程序可能需要根据用户的输入动态地更新页面上的内容，这个过程可能会涉及到大量的数据处理和操作。
    // JavaScript 的动态类型特性可以让开发者更加灵活地处理这些数据，并且不需要在运行之前就预先定义所有的变量类型。



    /*
        在if语句中，会触发Boolean上下文，JavaScript会将值强制类型转换为布尔值
        七种假值(又称虚值)，分别为undefined null "" false 0 0n NaN
        ==相等运算符，另一个是===全等运算符。它们最大区别在于对类型的宽容度。

        ==的运算规则：
        1.如果type(x) === type(y) , 此处比较过程与===相同；
        2.如果x is null，y is undefined，则返回true；反之亦然；
        3.如果x is string，y is number，则执行ToNumber(x) == y；反之亦然；
        4.如果x is boolean，则执行ToNumber(x) == y；反之亦然；
        5.如果x is object，则执行ToPrimitive(x) == y；反之亦然；
        都不是以上情况，返回false；

        ToNumber(x)
        1. x is undefined, return NaN;
        2. x is null, return 0;
        3. x is number, return x;
        4. x is boolean, return x === true ? 1 : 0;
        5. x is string, return [ToNumber Applied to the String Type](http://www.ecma-international.org/ecma-262/5.1/#sec-9.3.1);
        6. x is object, return ToNumber(ToPrimitive(x))

        ToPrimitive(x)
        1. x is object, return x.valueOf() or x.toString();
        2. x is non-object, return x;   

    */
        // Object.is()
        // 在ES6，新增了一种判断两个操作数是否相等的方法，也是最为严格的判等方式——Object.is()。使用它，可以确保两个操作一定是相等的，容不得一点沙子
        // Object.is()与===全等运算符的区别在于对待NaN，+0，-0的判定有所不同
        // NaN === NaN  // false
        // Object.is(NaN, NaN)  // true
        // +0 === -0  // true
        // Object.is(+0, -0)  // false
}

const test = () => {

 }